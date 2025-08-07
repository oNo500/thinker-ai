'use client';

import { Button } from '@repo/ui/components/button';
import { ArrowRight, Play, Sparkles } from 'lucide-react';

import { Typewriter } from '@/components/ui/typewriter';
import { ParticlesBackground } from '@/components/ui/particles-background';
import { PDF_PRD_URL } from '@/lib/constant';

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
          <div className="flex min-h-[90vh] flex-col justify-center text-center">
            {/* Main Heading with Dynamic Effect */}
            <h1 className="text-6xl font-bold tracking-tight text-gray-900 sm:text-8xl lg:text-9xl dark:text-white">
              <span className="mb-6 block">ThinkerAI</span>
              <div className="text-5xl font-bold text-blue-600 sm:text-7xl lg:text-8xl dark:text-blue-400">
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

            {/* Simple Description */}
            <p className="mx-auto mt-12 max-w-2xl text-xl text-gray-600 dark:text-gray-300">
              将零散信息转化为可视化知识网络，AI 助力深度思考
            </p>

            {/* CTA Button */}
            <div className="mt-16">
              <Button
                onClick={() => window.open(PDF_PRD_URL, '_self')}
                size="lg"
                className="group inline-flex items-center rounded-full bg-blue-600 !px-12 !py-6 text-2xl font-semibold text-white shadow-2xl transition-all hover:scale-105 hover:bg-blue-700"
              >
                立即免费体验
                <ArrowRight className="ml-3 h-7 w-7 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </ParticlesBackground>
    </section>
  );
};

export default Hero;
