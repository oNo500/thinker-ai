'use client';

import { useState, useEffect } from 'react';

interface TypewriterTextProps {
  texts: string[];
  speed?: number;
  deleteSpeed?: number;
  pauseDuration?: number;
  className?: string;
  textStyles?: string[];
  customStyles?: React.CSSProperties[];
}

const TypewriterText = ({
  texts,
  speed = 100,
  deleteSpeed = 50,
  pauseDuration = 2000,
  className = '',
  textStyles = [],
  customStyles = [],
}: TypewriterTextProps) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (texts.length === 0) return;

    const timeout = setTimeout(
      () => {
        const fullText = texts[currentTextIndex];
        if (typeof fullText !== 'string') return;

        if (isPaused) {
          setIsPaused(false);
          setIsDeleting(true);
          return;
        }

        if (isDeleting) {
          setCurrentText((prev) => prev.slice(0, -1));

          if (currentText === '') {
            setIsDeleting(false);
            setCurrentTextIndex((prev) => (prev + 1) % texts.length);
          }
        } else {
          setCurrentText(fullText.slice(0, currentText.length + 1));

          if (currentText === fullText) {
            setIsPaused(true);
          }
        }
      },
      isPaused ? pauseDuration : isDeleting ? deleteSpeed : speed,
    );

    return () => clearTimeout(timeout);
  }, [currentText, currentTextIndex, isDeleting, isPaused, texts, speed, deleteSpeed, pauseDuration]);

  const currentStyle = textStyles[currentTextIndex] || '';
  const currentCustomStyle = customStyles[currentTextIndex] || {};

  return (
    <span className={className}>
      <span className={currentStyle} style={currentCustomStyle}>
        {currentText}
      </span>
      <span
        className={`inline-block -translate-y-2 animate-pulse align-baseline ${currentStyle}`}
        style={currentCustomStyle}
      >
        |
      </span>
    </span>
  );
};

export default TypewriterText;
