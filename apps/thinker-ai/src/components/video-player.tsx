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

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
          // 只有当autoPlay为true且视频在视口中时才播放
          setShouldPlay(autoPlay && entry.isIntersecting);
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

  return (
    <div ref={containerRef} className={cn('overflow-hidden rounded-lg', className)}>
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
    </div>
  );
};

export default VideoPlayer;
