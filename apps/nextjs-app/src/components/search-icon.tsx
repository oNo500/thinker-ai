const searchIcon = 'http://localhost:3845/assets/536bce98fe657566d2a3d1b89249f3d4b7872575.svg';
const searchIcon2 = 'http://localhost:3845/assets/c117ecbde1143693720886a01cce456fa533b167.svg';

interface SearchIconProps {
  className?: string;
}

export default function SearchIcon({ className = '' }: SearchIconProps) {
  return (
    <div className={`relative h-[22.903px] w-[22.903px] ${className}`}>
      <div className="absolute inset-[16.67%_20.83%_20.83%_16.67%]">
        <div className="absolute inset-[-4%]" style={{ '--stroke-0': 'rgba(19, 18, 60, 1)' } as React.CSSProperties}>
          <img alt="" className="block size-full max-w-none" src={searchIcon} />
        </div>
      </div>
      <div className="absolute inset-[70.5%_16.78%_16.67%_70.39%]">
        <div
          className="absolute inset-[-19.48%]"
          style={{ '--stroke-0': 'rgba(19, 18, 60, 1)' } as React.CSSProperties}
        >
          <img alt="" className="block size-full max-w-none" src={searchIcon2} />
        </div>
      </div>
    </div>
  );
}
