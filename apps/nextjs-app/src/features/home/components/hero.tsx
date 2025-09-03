import GradientThinkerTitle from '@/components/gradient-thinker-title';
import AnimatedBackground from '@/components/animated-background';

import SpotlightTextMask from './spotlight-text-mask';
import { FreeButton } from './free-button';

const Hero = () => {
  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-32">
      <AnimatedBackground />
      <div className="mx-auto max-w-6xl text-center">
        <div className="mb-8">
          <div className="mb-8 flex justify-center">
            <GradientThinkerTitle />
          </div>
          <h1 className="mb-6 text-9xl font-bold leading-tight text-gray-900 md:text-6xl lg:text-7xl">
            构建知识网络！
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-600">AI 驱动的全形态知识智能管理平台</p>
          <SpotlightTextMask />
        </div>
        <FreeButton />
      </div>
    </section>
  );
};

export default Hero;
