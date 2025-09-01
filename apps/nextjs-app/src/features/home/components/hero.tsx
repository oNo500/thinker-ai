import { Button } from '@/components/ui/button';
import GradientThinkerTitle from '@/components/gradient-thinker-title';
import AnimatedBackground from '@/components/animated-background';

const Hero = () => {
  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-32">
      <AnimatedBackground />
      <div className="mx-auto max-w-6xl text-center">
        <div className="mb-8">
          <div className="mb-8 flex justify-center">
            <GradientThinkerTitle />
          </div>

          <div className="mb-6 flex justify-center">
            <div className="bg-clip-text bg-gradient-to-r font-['Alibaba_PuHuiTi_3.0:85_Bold',_sans-serif] from-[#6e6bee] leading-[0] not-italic relative text-[32px] sm:text-[40px] md:text-[48px] text-center text-nowrap to-[#504dd1] tracking-[0.5px] sm:tracking-[1px]" data-node-id="61:459" style={{ WebkitTextFillColor: "transparent" }}>
              <p className="leading-[2.48] whitespace-pre">
                <span className="text-[#000000]">信息时代的</span>
                <span className="bg-clip-text bg-gradient-to-r from-[#b5b3ff] to-[#504dd1]" style={{ WebkitTextFillColor: "transparent" }}>
                  知识管理困境
                </span>
              </p>
            </div>
          </div>

          <div className="mb-6 flex justify-center">
            <p
              className="whitespace-nowrap text-center text-[20px] leading-none tracking-[4px] text-[#000000] sm:whitespace-normal sm:text-[18px] sm:tracking-[2px] md:text-[20px]"
              style={{
                fontFamily: "'Alibaba PuHuiTi 3.0:55 Regular', sans-serif",
              }}
              data-node-id="61:470"
            >
              AI 驱动的全形态知识智能管理平台
            </p>
          </div>

          <h1 className="mb-6 text-5xl font-bold leading-tight text-gray-900 md:text-6xl lg:text-7xl">
            构建知识网络！
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-600">用心整理每一个想法和灵感</p>
        </div>
        <Button
          size="lg"
          className="rounded-full bg-gray-900 px-8 py-4 text-lg font-medium text-white hover:bg-gray-800"
        >
          开始体验 →
        </Button>
      </div>
    </section>
  );
};

export default Hero;
