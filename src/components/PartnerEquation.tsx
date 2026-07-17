import Magnet from './Magnet';

function Figure({ label, src, alt }: { label: string; src: string; alt: string }) {
  return (
    <div className="flex flex-col items-center gap-[1.5vw] sm:gap-3">
      <span className="text-[3.2vw] font-semibold uppercase tracking-[0.2em] text-white sm:text-sm sm:tracking-[0.3em] md:text-base">
        {label}
      </span>
      <Magnet padding={80} strength={6}>
        <img
          src={src}
          alt={alt}
          className="h-[51vw] w-auto sm:h-[300px] md:h-[380px] lg:h-[460px]"
        />
      </Magnet>
    </div>
  );
}

function Operator({ children, className = '' }: { children: string; className?: string }) {
  return <span className={`font-black leading-none text-white ${className}`}>{children}</span>;
}

export default function PartnerEquation() {
  return (
    <div
      className="flex flex-col items-center gap-[3vw] sm:flex-row sm:gap-8 md:gap-10"
      style={{ filter: 'drop-shadow(0 6px 20px rgba(0, 0, 0, 0.5))' }}
    >
      {/* Row 1 (phone) / left (desktop): Me + You + The Bridge */}
      <div className="flex flex-nowrap items-center justify-center gap-x-[1.5vw] px-[1.5vw] sm:gap-x-8 sm:px-0 md:gap-x-10">
        <Figure label="Me" src="/me-cut.png" alt="Daniel, 3D figure" />
        <Operator className="text-[6vw] sm:text-5xl md:text-6xl">+</Operator>
        <Figure label="You" src="/mystery-cut.png" alt="Future partner, mystery figure" />
        <Operator className="text-[6vw] sm:text-5xl md:text-6xl">+</Operator>
        <Magnet padding={80} strength={6}>
          <img
            src="/bridge-logo.png"
            alt="The Bridge"
            className="h-[25vw] w-auto rounded-[3vw] sm:h-[180px] sm:rounded-2xl md:h-[220px] lg:h-[250px]"
          />
        </Magnet>
      </div>

      {/* Row 2 (phone) / middle (desktop): = */}
      <Operator className="text-[17vw] sm:text-5xl md:text-6xl">=</Operator>

      {/* Row 3 (phone) / right (desktop): 1B$ */}
      <div className="text-center">
        <div className="hero-heading-white text-[30vw] font-black leading-none sm:text-7xl md:text-8xl lg:text-[10rem]">
          1B$
        </div>
        <div className="mt-[1vw] text-[3.4vw] font-medium uppercase tracking-[0.3em] text-white sm:mt-1 sm:text-base sm:tracking-[0.35em] md:text-lg">
          Company
        </div>
      </div>
    </div>
  );
}
