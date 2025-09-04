import GradientThinkerTitle from '@/components/gradient-thinker-title';
import AnimatedBackground from '@/components/animated-background';
import { ParticlesBackground } from '@/components/ui/particles-background';

import SpotlightTextMask from './spotlight-text-mask';
import { FreeButton } from './free-button';
import TypewriterText from './typewriter-text';

const Hero = () => {
  return (
    <ParticlesBackground>
      <section className="relative min-h-svh w-full overflow-hidden px-4 pb-20 pt-32">
        <AnimatedBackground />
        <div className="mx-auto mt-[2%] max-w-6xl pb-[50px] text-center">
          <div className="mb-8">
            <div className="mb-6 flex justify-center">
              <GradientThinkerTitle />
            </div>
            <h1 className="mb-6 !text-[133px] font-bold leading-tight text-gray-900 md:text-6xl lg:text-7xl">
              <TypewriterText texts={['构建知识网络']} speed={150} deleteSpeed={75} pauseDuration={3000} />
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-600">AI 驱动的全形态知识智能管理平台</p>
            <div className="relative pb-[100px]">
              <div className="absolute bottom-0 left-1/2 h-[200px] -translate-x-[50%] -translate-y-[50px]">
                <SpotlightTextMask />
              </div>
            </div>
          </div>
          <FreeButton />
        </div>
      </section>
    </ParticlesBackground>
  );
};

export default Hero;
