import { Button } from '@/components/ui/button';
import GradientThinkerTitle from '@/components/gradient-thinker-title';
import AnimatedBackground from '@/components/animated-background';
import SpotlightTextMask from './spotlight-text-mask';

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
        <Button
          size="lg"
          className="rounded-full bg-gray-900 !px-[25px] py-4 text-xl h-[55px] font-medium text-white hover:bg-gray-800"
        >
          免费体验  <svg style={{
            width: '44px',
            height: '44px',
            marginRight: '-16px'
          }} width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.600098 21.8499C0.600098 33.6964 10.2036 43.2999 22.0501 43.2999C33.8966 43.2999 43.5001 33.6964 43.5001 21.8499C43.5001 10.0034 33.8966 0.399902 22.0501 0.399902C10.2036 0.399902 0.600098 10.0034 0.600098 21.8499ZM23.0834 12.9832C23.7277 12.3388 24.7725 12.3388 25.4168 12.9832L33.1168 20.6832C33.4263 20.9926 33.6001 21.4123 33.6001 21.8499C33.6001 22.2875 33.4263 22.7072 33.1168 23.0166L25.4168 30.7166C24.7725 31.361 23.7277 31.361 23.0834 30.7166C22.439 30.0723 22.439 29.0275 23.0834 28.3832L27.9666 23.4999L12.1501 23.4999C11.2388 23.4999 10.5001 22.7612 10.5001 21.8499C10.5001 20.9386 11.2388 20.1999 12.1501 20.1999L27.9666 20.1999L23.0834 15.3166C22.439 14.6723 22.439 13.6275 23.0834 12.9832Z" fill="white" />
          </svg>

        </Button>
      </div>
    </section>
  );
};

export default Hero;
