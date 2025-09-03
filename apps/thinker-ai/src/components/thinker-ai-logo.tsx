const imgThinkerAI = 'http://localhost:3845/assets/3175492ec1f2b5b8d51840f508ae930a81b77ae4.png';

interface ThinkerAILogoProps {
  className?: string;
}

export default function ThinkerAILogo({ className = '' }: ThinkerAILogoProps) {
  return (
    <div className={`relative inline-flex items-center ${className}`} data-name="thinker-ai-logo">
      <div className="h-[29px] w-[29px] flex-shrink-0 rounded-[7px] bg-[#6e6bee]" />
      <div
        className="ml-3 h-[17px] w-20 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${imgThinkerAI}')` }}
      />
    </div>
  );
}
