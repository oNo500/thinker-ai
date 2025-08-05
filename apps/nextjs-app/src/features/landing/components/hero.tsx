'use client';

import { Button } from '@repo/ui/components/button';
import { ArrowRight, Play, Sparkles } from 'lucide-react';

import { Typewriter } from '@/components/ui/typewriter';
import { ParticlesBackground } from '@/components/ui/particles-background';

const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-gradient-to-r from-blue-400/10 to-purple-600/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-gradient-to-r from-emerald-400/10 to-cyan-600/10 blur-3xl" />
      </div>

      {/* Particles Background with Content */}
      <ParticlesBackground
        particleCount={800}
        noiseIntensity={0.002}
        particleSize={{ min: 0.5, max: 1.5 }}
        className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800"
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex min-h-[85vh] flex-col justify-center pb-16 pt-20 sm:pb-20 sm:pt-24 lg:pb-28 lg:pt-32">
            {/* Main Content */}
            <div className="text-center">
              {/* Badge */}
              <div className="inline-flex items-center rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 ring-1 ring-blue-200 dark:bg-blue-950 dark:text-blue-400 dark:ring-blue-800">
                <Sparkles className="mr-2 h-4 w-4" />
                新一代AI知识管理平台
              </div>

              {/* Main Heading - 增大动态字体效果 */}
              <h1 className="mt-8 text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl lg:text-8xl dark:text-white">
                <span className="mb-4 block">ThinkerAI</span>
                <div className="text-4xl font-bold text-blue-600 sm:text-6xl lg:text-7xl dark:text-blue-400">
                  <Typewriter
                    text={['连接你的想法', '激发创意灵感', '构建知识网络', '释放思维潜能']}
                    speed={80}
                    waitTime={2500}
                    deleteSpeed={40}
                    loop={true}
                    className="inline-block min-h-[1.2em]"
                  />
                </div>
              </h1>

              {/* Subtitle */}
              <p className="mt-6 text-2xl font-medium text-gray-700 sm:text-3xl lg:text-4xl dark:text-gray-300">
                释放你的创造力
              </p>

              {/* Description */}
              <p className="mx-auto mt-8 max-w-3xl text-xl leading-8 text-gray-600 sm:text-2xl sm:leading-9 dark:text-gray-300">
                将零散信息转化为可视化知识网络，AI 助力深度思考。
                <br />
                阅读、写作、思考的无缝整合，让知识管理变得简单高效。
              </p>

              {/* Feature Highlights */}
              <div className="mt-10 flex flex-wrap justify-center gap-4 text-base text-gray-600 dark:text-gray-400">
                <span className="inline-flex items-center rounded-full bg-blue-50 px-4 py-2 font-medium text-blue-700 ring-1 ring-blue-200 dark:bg-blue-950 dark:text-blue-400 dark:ring-blue-800">
                  ⚡ 智能连接
                </span>
                <span className="inline-flex items-center rounded-full bg-purple-50 px-4 py-2 font-medium text-purple-700 ring-1 ring-purple-200 dark:bg-purple-950 dark:text-purple-400 dark:ring-purple-800">
                  🧠 深度思考
                </span>
                <span className="inline-flex items-center rounded-full bg-emerald-50 px-4 py-2 font-medium text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:ring-emerald-800">
                  📊 可视化网络
                </span>
                <span className="inline-flex items-center rounded-full bg-orange-50 px-4 py-2 font-medium text-orange-700 ring-1 ring-orange-200 dark:bg-orange-950 dark:text-orange-400 dark:ring-orange-800">
                  🔄 无缝整合
                </span>
              </div>

              {/* CTA Buttons */}
              <div className="mt-12 flex flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-8">
                <Button
                  size="lg"
                  className="group inline-flex items-center rounded-full bg-blue-600 px-10 py-5 text-xl font-semibold text-white shadow-lg transition-all hover:scale-105 hover:bg-blue-700 hover:shadow-xl"
                >
                  立即免费注册
                  <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="group inline-flex items-center rounded-full border-2 px-10 py-5 text-xl font-semibold transition-all hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <Play className="mr-3 h-6 w-6" />
                  观看产品演示
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="mt-12 text-lg text-gray-500 dark:text-gray-400">
                <p className="mb-4">
                  已有 <span className="text-2xl font-bold text-gray-900 dark:text-white">10,000+</span> 知识工作者选择
                  ThinkerAI
                </p>
                <div className="flex flex-wrap justify-center gap-6 text-base">
                  <span className="flex items-center gap-1">
                    ⭐ <strong>4.9/5</strong> 用户评分
                  </span>
                  <span className="flex items-center gap-1">
                    🔒 <strong>企业级</strong> 数据安全
                  </span>
                  <span className="flex items-center gap-1">
                    🚀 <strong>7天</strong> 免费试用
                  </span>
                </div>
              </div>
            </div>

            {/* Product Preview - 简化版本 */}
            <div className="mt-16">
              <div className="relative mx-auto max-w-4xl">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 blur-2xl" />
                <div className="relative rounded-xl bg-white/70 p-1 shadow-xl ring-1 ring-gray-900/5 backdrop-blur-sm dark:bg-gray-900/70 dark:ring-white/10">
                  <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">知识网络预览</h3>
                      <div className="flex gap-1">
                        <div className="h-2 w-2 rounded-full bg-red-400" />
                        <div className="h-2 w-2 rounded-full bg-yellow-400" />
                        <div className="h-2 w-2 rounded-full bg-green-400" />
                      </div>
                    </div>
                    <div className="relative h-32 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
                      {/* 简化的节点展示 */}
                      <div className="absolute left-4 top-4 h-6 w-16 rounded bg-blue-200 text-center text-xs leading-6 text-blue-800 dark:bg-blue-800 dark:text-blue-200">
                        想法
                      </div>
                      <div className="w-18 absolute right-6 top-3 h-6 rounded bg-purple-200 text-center text-xs leading-6 text-purple-800 dark:bg-purple-800 dark:text-purple-200">
                        网络
                      </div>
                      <div className="absolute bottom-4 left-8 h-6 w-14 rounded bg-emerald-200 text-center text-xs leading-6 text-emerald-800 dark:bg-emerald-800 dark:text-emerald-200">
                        AI
                      </div>
                      <div className="absolute bottom-3 right-4 h-6 w-16 rounded bg-orange-200 text-center text-xs leading-6 text-orange-800 dark:bg-orange-800 dark:text-orange-200">
                        思考
                      </div>
                      {/* 连接线 */}
                      <svg className="absolute inset-0 h-full w-full">
                        <path
                          d="M 52 20 Q 80 30 120 26"
                          stroke="currentColor"
                          strokeWidth="1"
                          fill="none"
                          className="text-gray-400"
                        />
                        <path
                          d="M 120 26 Q 100 50 80 80"
                          stroke="currentColor"
                          strokeWidth="1"
                          fill="none"
                          className="text-gray-400"
                        />
                        <path
                          d="M 80 80 Q 140 85 180 79"
                          stroke="currentColor"
                          strokeWidth="1"
                          fill="none"
                          className="text-gray-400"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ParticlesBackground>
    </section>
  );
};

export default Hero;
