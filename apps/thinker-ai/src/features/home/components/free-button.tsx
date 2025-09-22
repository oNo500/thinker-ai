'use client';

import { useState } from 'react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { mockJump } from '@/lib/mock-jump';
import { cn } from '@/lib/utils';

interface FreeButtonProps {
  className?: string;
}

export const FreeButton = ({ className }: FreeButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Button
      onClick={mockJump}
      size="lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        'hover:bg-balck relative h-[55px] w-[188px] cursor-pointer rounded-full bg-black text-xl font-medium text-white',
        className,
      )}
    >
      <span className="absolute left-[28px]">免费体验&nbsp;&nbsp;&nbsp;</span>
      <Image
        src={isHovered ? '/Vector-hover.png' : '/Vector.png'}
        alt="Arrow icon"
        width={isHovered ? 61 : 43}
        height={isHovered ? 61 : 43}
        className={`absolute ${isHovered ? 'right-[-1px]' : 'right-[7.5px]'}`}
      />
    </Button>
  );
};
