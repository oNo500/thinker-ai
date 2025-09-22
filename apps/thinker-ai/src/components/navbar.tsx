'use client';

import Link from 'next/link';
import { Search } from 'lucide-react';

import { mockJump } from '@/lib/mock-jump';

const NAV_LIST = [
  {
    name: '首页',
  },
  {
    name: '产品',
  },
  {
    name: '会员',
  },
  {
    name: '云协作',
  },
  {
    name: '模板库',
  },
  {
    name: '下载',
  },
];

export default function Navbar() {
  return (
    <nav className="fixed left-0 top-0 z-50 w-full bg-white">
      <div className="mx-auto flex h-16 flex-nowrap items-center justify-between gap-4 whitespace-nowrap px-4 sm:px-6 lg:px-8">
        <div className="flex-shrink-0">
          <Link href="/" className="item-center flex gap-2">
            <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="29" height="29" rx="7" fill="#6E6BEE" />
              <rect width="29" height="29" rx="7" fill="url(#paint0_linear_61_305)" />
              <defs>
                <linearGradient
                  id="paint0_linear_61_305"
                  x1="6.20353"
                  y1="0.362276"
                  x2="22.3327"
                  y2="29.3121"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#6E6BEE" />
                  <stop offset="1" stopColor="#AFAED0" />
                </linearGradient>
              </defs>
            </svg>
            <span className="font-bold">ThinkerAI</span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          {NAV_LIST.map((item) => (
            <Link
              key={item.name}
              href={`#${item.name}`}
              className="rounded-[20px] px-8 py-2 text-[#848484] transition-all duration-200 hover:bg-[#efefef] hover:text-[#848484]"
            >
              {item.name}
            </Link>
          ))}
          <div className="flex items-center gap-8">
            <div className="flex items-center justify-center">
              <Search className="h-5 w-5 text-gray-600" />
            </div>
            <button
              type="button"
              onClick={mockJump}
              className="flex h-[43px] items-center justify-center rounded-[5px] bg-[#000000] px-6 py-[3px] text-white"
            >
              登录
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
