'use client';

import React, { useRef, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';

import { cn } from '@/lib/utils';

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
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [shouldPlay, setShouldPlay] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
          // 只有当autoPlay为true且视频在视口中时才播放
          const shouldAutoPlay = autoPlay && entry.isIntersecting;
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

  // 切换播放/暂停状态
  const togglePlay = () => {
    if (isInView) {
      const newPlayingState = !isPlaying;
      setIsPlaying(newPlayingState);
      setShouldPlay(newPlayingState);
    }
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      ref={containerRef}
      className={cn('group relative overflow-hidden rounded-lg', className)}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <ReactPlayer
        src={src}
        playing={shouldPlay}
        muted={muted}
        loop={loop}
        controls={controls}
        playsInline={playsInline}
        width={width}
        height={height}
        style={{
          borderRadius: '8px',
          overflow: 'hidden',
        }}
      />

      {/* 播放/暂停控制按钮 */}
      {isInView && (
        <div
          className={cn(
            'absolute inset-0 flex items-center justify-center transition-opacity duration-300',
            showControls || !isPlaying ? 'opacity-100' : 'opacity-0',
          )}
        >
          <button
            onClick={togglePlay}
            className={cn(
              'flex h-16 w-16 items-center justify-center rounded-full bg-black/60 text-white transition-all duration-200 hover:scale-110 hover:bg-black/80',
              'border border-white/20 backdrop-blur-sm',
            )}
            aria-label={isPlaying ? '暂停视频' : '播放视频'}
          >
            {isPlaying ? (
              // 暂停图标
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="6" y="4" width="4" height="16" fill="currentColor" rx="1" />
                <rect x="14" y="4" width="4" height="16" fill="currentColor" rx="1" />
              </svg>
            ) : (
              // 播放图标
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 5v14l11-7L8 5z" fill="currentColor" />
              </svg>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
