interface GradientThinkerTitleProps {
  className?: string;
}

export default function GradientThinkerTitle({ className = '' }: GradientThinkerTitleProps) {
  return (
    <div className={`group relative inline-flex cursor-pointer items-center gap-2 ${className}`}>
      {/* Purple T icon */}
      <div
        className="flex h-[35px] w-[35px] items-center justify-center rounded-[4.738px] bg-[#6e6bee] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#5c5aa6] group-hover:shadow-lg group-hover:shadow-[#6e6bee]/20"
        data-node-id="61:389"
      >
        <span
          className="text-[35.762px] font-bold leading-none text-white transition-transform duration-300 group-hover:scale-105"
          style={{
            fontFamily: "'Alibaba PuHuiTi 3.0:105 Heavy', sans-serif",
            letterSpacing: '0.7905px',
          }}
          data-node-id="69:171"
        >
          T
        </span>
      </div>

      {/* Gradient ThinkerAI text */}
      <h2
        className="bg-gradient-to-r from-[#6e6bee] via-[#8b5cf6] to-[#c084fc] bg-clip-text font-bold leading-none text-transparent transition-all duration-500 group-hover:scale-105 group-hover:bg-gradient-to-r group-hover:from-[#8b5cf6] group-hover:via-[#a855f7] group-hover:to-[#d946ef]"
        style={{
          fontFamily: "'Alibaba PuHuiTi 3.0:105 Heavy', sans-serif",
          fontSize: '41.484px',
          letterSpacing: '0.917px',
          WebkitTextFillColor: 'transparent',
          backgroundSize: '200% 100%',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          backgroundPosition: '0% 50%',
          transition: 'all 0.5s ease-in-out',
        }}
        data-node-id="61:388"
      >
        ThinkerAI：
      </h2>

      {/* Hover glow effect */}
      <div className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-r from-[#6e6bee]/10 via-[#8b5cf6]/10 to-[#c084fc]/10 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />
    </div>
  );
}
