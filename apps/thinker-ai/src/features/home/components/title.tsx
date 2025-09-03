interface TitleProps {
  title: string;
  subtitle: string;
  description?: string;
}
export const Title = ({ title, subtitle, description }: TitleProps) => {
  return (
    <div>
      <div className="text-center text-5xl font-bold text-black">
        {title}
        <span
          style={{
            background: 'linear-gradient(90deg, #B5B3FF 0%, #504DD1 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {subtitle}
        </span>
      </div>
      <div className="mt-8 text-xl text-black text-center">{description}</div>
    </div>
  );
};
