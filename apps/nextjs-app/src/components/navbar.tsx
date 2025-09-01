'use client';

import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { useLogout } from '@/auth';
import { useUser } from '@/hooks/use-user';
import ThinkerAILogo from '@/components/thinker-ai-logo';
import SearchIcon from '@/components/search-icon';

export default function Navbar({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { mutate: logout } = useLogout();
  const { userData } = useUser(isLoggedIn);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="fixed left-0 top-0 z-50 w-full bg-white">
      <div className="mx-auto flex h-16 max-w-6xl flex-nowrap items-center justify-between gap-4 whitespace-nowrap px-4 sm:px-6 lg:px-8">
        <div className="flex-shrink-0">
          <Link href="/" className="block">
            <ThinkerAILogo />
          </Link>
        </div>

        <div
          className="hidden items-center gap-[65px] md:flex"
          style={{
            fontFamily: "'Alibaba PuHuiTi 3.0:55 Regular', sans-serif",
            fontSize: '15.743px',
            letterSpacing: '4px',
          }}
        >
          <Link
            href="#home"
            className="rounded-[20px] px-4 py-2 text-[#848484] transition-all duration-200 hover:bg-[#efefef] hover:text-[#848484]"
          >
            首页
          </Link>
          <Link
            href="#product"
            className="rounded-[20px] px-4 py-2 text-[#848484] transition-all duration-200 hover:bg-[#efefef] hover:text-[#848484]"
          >
            产品
          </Link>
          <Link
            href="#member"
            className="rounded-[20px] px-4 py-2 text-[#848484] transition-all duration-200 hover:bg-[#efefef] hover:text-[#848484]"
          >
            会员
          </Link>
          <Link
            href="#collaboration"
            className="rounded-[20px] px-4 py-2 text-[#848484] transition-all duration-200 hover:bg-[#efefef] hover:text-[#848484]"
          >
            云协作
          </Link>
          <Link
            href="#templates"
            className="rounded-[20px] px-4 py-2 text-[#848484] transition-all duration-200 hover:bg-[#efefef] hover:text-[#848484]"
          >
            模板库
          </Link>
          <Link
            href="#download"
            className="rounded-[20px] px-4 py-2 text-[#848484] transition-all duration-200 hover:bg-[#efefef] hover:text-[#848484]"
          >
            下载
          </Link>
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <div className="flex items-center justify-center">
            <SearchIcon />
          </div>
          <div
            className="flex h-[29px] w-[75px] items-center justify-center rounded-[5px] bg-[#000000] px-4 py-[3px] text-white"
            style={{
              fontFamily: "'Alibaba PuHuiTi 3.0:55 Regular', sans-serif",
              fontSize: '15.743px',
              letterSpacing: '2px',
            }}
          >
            登录
          </div>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-purple-50"
            aria-label="Toggle menu"
          >
            <div className="space-y-1">
              <div
                className={`h-0.5 w-5 bg-current transition-transform ${
                  isMobileMenuOpen ? 'translate-y-1.5 rotate-45' : ''
                }`}
              />
              <div
                className={`h-0.5 w-5 bg-current transition-opacity ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}
              />
              <div
                className={`h-0.5 w-5 bg-current transition-transform ${
                  isMobileMenuOpen ? '-translate-y-1.5 -rotate-45' : ''
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          className={`bg-white/98 fixed left-0 right-0 z-40 backdrop-blur-md transition-transform duration-300 ease-in-out md:hidden ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'} `}
          style={{
            top: '64px',
            height: 'calc(100vh - 64px)',
          }}
        >
          <div className="relative mx-auto h-full max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex h-full flex-col gap-6">
              <Link
                href="#home"
                className="rounded-[20px] px-4 py-2 text-lg font-medium text-[#848484] transition-all duration-200 hover:bg-[#efefef]"
              >
                首页
              </Link>
              <Link
                href="#product"
                className="rounded-[20px] px-4 py-2 text-lg font-medium text-[#848484] transition-all duration-200 hover:bg-[#efefef]"
              >
                产品
              </Link>
              <Link
                href="#member"
                className="rounded-[20px] px-4 py-2 text-lg font-medium text-[#848484] transition-all duration-200 hover:bg-[#efefef]"
              >
                会员
              </Link>
              <Link
                href="#collaboration"
                className="rounded-[20px] px-4 py-2 text-lg font-medium text-[#848484] transition-all duration-200 hover:bg-[#efefef]"
              >
                云协作
              </Link>
              <Link
                href="#templates"
                className="rounded-[20px] px-4 py-2 text-lg font-medium text-[#848484] transition-all duration-200 hover:bg-[#efefef]"
              >
                模板库
              </Link>
              <Link
                href="#download"
                className="rounded-[20px] px-4 py-2 text-lg font-medium text-[#848484] transition-all duration-200 hover:bg-[#efefef]"
              >
                下载
              </Link>
            </div>
            <div className="absolute bottom-6 right-6 flex flex-col items-end gap-3">
              <div
                className="flex h-[29px] w-[75px] items-center justify-center rounded-[5px] bg-[#000000] px-4 py-[3px] text-white"
                style={{
                  fontFamily: "'Alibaba PuHuiTi 3.0:55 Regular', sans-serif",
                  fontSize: '15.743px',
                  letterSpacing: '2px',
                }}
              >
                登录
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
