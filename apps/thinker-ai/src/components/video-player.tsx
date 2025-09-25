'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import ReactPlayer from 'react-player';

import { cn } from '@/lib/utils';

// 调试开关 - 移到组件外部避免依赖警告
const DEBUG = true;

interface VideoPlayerProps {
  src: string;
  poster?: string;
  className?: string;
  width?: number | string;
  height?: number | string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
  playsInline?: boolean;
  threshold?: number; // 视口交叉阈值，默认0.5（50%可见时播放）
  showProgressBar?: boolean; // 是否显示进度条
  preloadOnMount?: boolean; // 是否在组件挂载时就预加载视频
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  poster,
  className,
  width = 950,
  height = 'auto',
  autoPlay = true,
  muted = true,
  loop = true,
  controls = false,
  playsInline = true,
  threshold = 0.5,
  showProgressBar = true,
  preloadOnMount = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HTMLVideoElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [shouldPlay, setShouldPlay] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);

  // 进度条相关状态
  const [duration, setDuration] = useState(0);
  const [played, setPlayed] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [currentSeconds, setCurrentSeconds] = useState(0);

  // 倍速功能
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const speedOptions = [0.5, 0.75, 1, 1.25, 1.5, 2];

  // 预加载视频（在组件挂载时）
  useEffect(() => {
    if (!preloadOnMount) return;

    // 创建隐藏的video元素来预加载
    const preloadVideo = document.createElement('video');
    preloadVideo.src = src;
    preloadVideo.preload = 'auto';
    preloadVideo.muted = true;
    preloadVideo.style.display = 'none';

    // 添加到DOM中开始预加载
    document.body.appendChild(preloadVideo);

    if (DEBUG) console.log('[VideoPlayer] Starting preload for:', src);

    // 预加载完成后的处理
    const handlePreloadComplete = () => {
      if (DEBUG) console.log('[VideoPlayer] Preload completed for:', src);
    };

    preloadVideo.addEventListener('canplaythrough', handlePreloadComplete);

    // 清理函数
    return () => {
      preloadVideo.removeEventListener('canplaythrough', handlePreloadComplete);
      if (document.body.contains(preloadVideo)) {
        document.body.removeChild(preloadVideo);
      }
    };
  }, [src, preloadOnMount]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (DEBUG)
            console.log('[VideoPlayer] IntersectionObserver', { isIntersecting: entry.isIntersecting, autoPlay });
          setIsInView(entry.isIntersecting);
          // 只有当autoPlay为true且视频在视口中时才播放
          const shouldAutoPlay = autoPlay && entry.isIntersecting;
          if (DEBUG) console.log('[VideoPlayer] shouldAutoPlay', shouldAutoPlay);
          setShouldPlay(shouldAutoPlay);
          setIsPlaying(shouldAutoPlay);
        });
      },
      {
        threshold,
        rootMargin: '50px', // 提前50px开始检测
      },
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [autoPlay, threshold]);

  // 点击外部关闭倍速菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showSpeedMenu && containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSpeedMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSpeedMenu]);

  // 切换播放/暂停状态
  const togglePlay = () => {
    if (isInView) {
      const newPlayingState = !isPlaying;
      if (DEBUG) console.log('[VideoPlayer] togglePlay', { from: isPlaying, to: newPlayingState });
      setIsPlaying(newPlayingState);
      setShouldPlay(newPlayingState);
    }
  };

  const toggleSpeedMenu = () => {
    setShowSpeedMenu(!showSpeedMenu);
  };

  const selectSpeed = (speed: number) => {
    setPlaybackRate(speed);
    setShowSpeedMenu(false);

    // 设置视频播放速度
    if (playerRef.current) {
      playerRef.current.playbackRate = speed;
    }
  };

  // ReactPlayer事件回调
  const handleProgress = useCallback(
    (state: { played: number; playedSeconds: number; loaded: number; loadedSeconds: number }) => {
      if (!seeking) {
        setPlayed(state.played ?? 0);
        setCurrentSeconds(state.playedSeconds ?? 0);
      }
    },
    [seeking],
  );

  const handleDuration = useCallback((seconds: number) => {
    if (DEBUG) console.log('[VideoPlayer] onDuration', seconds);
    setDuration(Number.isFinite(seconds) ? seconds : 0);
  }, []);

  // Ready 时优先通过实例方法读取总时长
  // HTML5 视频事件：元数据加载完成可拿到时长
  const handleLoadedMetadata = useCallback((e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    const dur = (e.currentTarget as HTMLVideoElement).duration ?? 0;
    if (DEBUG) console.log('[VideoPlayer] onLoadedMetadata duration', dur);
    setDuration(Number.isFinite(dur) ? dur : 0);
  }, []);

  // HTML5 视频事件：时间更新
  const handleTimeUpdate = useCallback(
    (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
      if (seeking) return;
      const el = e.currentTarget as HTMLVideoElement;
      const currentTime = el.currentTime ?? 0;
      const dur = duration || el.duration || 0;
      const playedRatio = dur > 0 ? currentTime / dur : 0;
      if (DEBUG) console.log('[VideoPlayer] onTimeUpdate', { currentTime, dur, playedRatio });
      setCurrentSeconds(currentTime);
      setDuration(Number.isFinite(dur) ? dur : 0);
      setPlayed(playedRatio);
    },
    [seeking, duration],
  );

  // 进度条交互处理
  const handleSeekMouseDown = useCallback(() => {
    if (DEBUG) console.log('[VideoPlayer] seek mousedown');
    setSeeking(true);
  }, []);

  const handleSeekChange = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!progressBarRef.current) return;
      const rect = progressBarRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const newPlayed = clickX / rect.width;
      const clamped = Math.max(0, Math.min(1, newPlayed));
      if (DEBUG)
        console.log('[VideoPlayer] seek changing', {
          clickX,
          width: rect.width,
          clamped,
          previewSeconds: clamped * duration,
        });
      setPlayed(clamped);
      setCurrentSeconds(clamped * duration);
    },
    [duration],
  );

  const handleSeekMouseUp = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!progressBarRef.current || !playerRef.current) return;
      const rect = progressBarRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const newPlayed = clickX / rect.width;
      const clampedPlayed = Math.max(0, Math.min(1, newPlayed));
      if (DEBUG) console.log('[VideoPlayer] seek mouseup', { clampedPlayed, targetSeconds: clampedPlayed * duration });
      setPlayed(clampedPlayed);
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const target = playerRef.current as any;
        if (DEBUG) console.log('[VideoPlayer] calling seek', { clampedPlayed });
        if (target && typeof target.seekTo === 'function') {
          target.seekTo(clampedPlayed);
        } else if (playerRef.current) {
          playerRef.current.currentTime = clampedPlayed * duration;
        }
      } catch {}
      setCurrentSeconds(clampedPlayed * duration);
      setSeeking(false);
    },
    [duration],
  );

  // 在进度回调中，如果未拿到时长，尝试用反推方式得到一次
  const handleBufferProgress = useCallback((e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    if (!DEBUG) return;
    const el = e.currentTarget as HTMLVideoElement;
    let bufferedEnd = 0;
    try {
      const last = el.buffered.length - 1;
      if (last >= 0) bufferedEnd = el.buffered.end(last);
    } catch {}
    console.log('[VideoPlayer] onProgress(buffering)', { readyState: el.readyState, bufferedEnd });
  }, []);

  // 格式化时间显示
  const formatTime = useCallback((seconds: number) => {
    if (!Number.isFinite(seconds) || seconds <= 0) return '0:00';
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = date.getUTCSeconds().toString().padStart(2, '0');
    if (hh) {
      return `${hh}:${mm.toString().padStart(2, '0')}:${ss}`;
    }
    return `${mm}:${ss}`;
  }, []);

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      ref={containerRef}
      className={cn('group relative overflow-hidden rounded-lg', className)}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* 使用 HTML5 事件：onLoadedMetadata/onTimeUpdate；progress 用于缓冲日志 */}
      <ReactPlayer
        ref={playerRef}
        src={src}
        playing={shouldPlay}
        muted={muted}
        loop={loop}
        controls={controls}
        playsInline={playsInline}
        width={width}
        height={height}
        playbackRate={playbackRate}
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onProgress={handleBufferProgress}
        onPlay={() => DEBUG && console.log('[VideoPlayer] onPlay')}
        onPause={() => DEBUG && console.log('[VideoPlayer] onPause')}
        onError={(e) => DEBUG && console.warn('[VideoPlayer] onError', e)}
        style={{
          borderRadius: '8px',
          overflow: 'hidden',
        }}
      />

      {/* 播放/暂停控制按钮 */}

      {/* 进度条 */}
      {showProgressBar && isInView && (
        <div
          className={cn(
            'absolute bottom-0 left-0 right-0 select-none bg-gradient-to-t from-black/60 to-transparent p-4 transition-opacity duration-300',
            showControls ? 'opacity-100' : 'opacity-0',
          )}
        >
          <div className="flex items-center gap-3 text-sm text-white">
            {/* 播放/暂停按钮 */}
            <button
              onClick={togglePlay}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white transition-all duration-200 hover:bg-white/30"
              aria-label={isPlaying ? '暂停视频' : '播放视频'}
            >
              {isPlaying ? (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="6" y="4" width="4" height="16" fill="currentColor" rx="1" />
                  <rect x="14" y="4" width="4" height="16" fill="currentColor" rx="1" />
                </svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 5v14l11-7L8 5z" fill="currentColor" />
                </svg>
              )}
            </button>

            {/* 当前时间 */}
            <span className="min-w-[40px] text-xs">{formatTime(seeking ? played * duration : currentSeconds)}</span>

            {/* 进度条容器 */}
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
            <div
              ref={progressBarRef}
              className="group/progress h-1 flex-1 cursor-pointer select-none rounded-full bg-white/30 caret-transparent outline-none"
              tabIndex={-1}
              onMouseDown={(e) => {
                e.preventDefault();
                handleSeekMouseDown();
              }}
              onMouseMove={seeking ? handleSeekChange : undefined}
              onMouseUp={(e) => {
                e.preventDefault();
                handleSeekMouseUp(e);
              }}
              onClick={(e) => {
                e.preventDefault();
                handleSeekMouseUp(e);
              }}
            >
              {/* 进度条背景 */}
              <div className="relative h-full">
                {/* 已播放进度 */}
                <div
                  className="h-full rounded-full bg-white transition-all duration-100"
                  style={{ width: `${played * 100}%` }}
                />
                {/* 进度点 */}
                <div
                  className="absolute top-1/2 h-3 w-3 -translate-y-1/2 transform rounded-full bg-white opacity-0 transition-opacity duration-200 group-hover/progress:opacity-100"
                  style={{ left: `${played * 100}%`, marginLeft: '-6px' }}
                />
              </div>
            </div>

            {/* 总时长 */}
            <span className="min-w-[40px] text-xs">{formatTime(duration)}</span>

            {/* 倍速按钮 */}
            <div className="relative">
              <button
                onClick={toggleSpeedMenu}
                className="flex h-6 w-12 items-center justify-center rounded bg-white/20 text-xs text-white transition-all duration-200 hover:bg-white/30"
                aria-label={`当前倍速: ${playbackRate}x`}
              >
                {playbackRate}x
              </button>

              {/* 倍速选择菜单 */}
              {showSpeedMenu && (
                <div className="absolute bottom-10 right-0 z-10 rounded-lg bg-black/90 p-2 shadow-lg backdrop-blur-sm">
                  <div className="flex flex-col gap-1">
                    {speedOptions.map((speed) => (
                      <button
                        key={speed}
                        onClick={() => selectSpeed(speed)}
                        className={`rounded px-3 py-1 text-xs transition-colors duration-200 ${
                          speed === playbackRate
                            ? 'bg-white/30 text-white'
                            : 'text-white/80 hover:bg-white/20 hover:text-white'
                        }`}
                      >
                        {speed}x
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
