import { useEffect, useRef } from 'react';

interface TickerStat {
  value: string;
  label: string;
}

const ROW_ONE: TickerStat[] = [
  { value: '$30K', label: 'ARR scaled as CEO' },
  { value: '$100K', label: 'angel round raised' },
  { value: '6,000', label: 'CROs reached' },
  { value: '100', label: 'discovery interviews' },
  { value: '2', label: 'companies founded' },
  { value: '1,000', label: 'downloads in 24 hours' },
  { value: '#5', label: 'on the iOS App Store' },
];

const ROW_TWO: TickerStat[] = [
  { value: '$4K', label: 'MRR in two weeks' },
  { value: '500K', label: 'views in month one' },
  { value: '2.9-4.5', label: 'ROAS' },
  { value: '10,000', label: 'active users' },
  { value: '10', label: 'days to build ActinGym' },
  { value: 'Playtika', label: 'NASDAQ: PLTK' },
  { value: 'IAF', label: 'backend engineer, 4 years' },
  { value: 'Antler', label: 'NYC residency' },
];

function TickerTile({ stat }: { stat: TickerStat }) {
  return (
    <div className="flex flex-none flex-col gap-1 whitespace-nowrap rounded-2xl border border-white/10 bg-white/[0.04] px-7 py-5">
      <span className="text-3xl font-black leading-none text-white md:text-4xl">{stat.value}</span>
      <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/45 md:text-[0.7rem]">
        <span className="text-[#C41E24]">+ </span>
        {stat.label}
      </span>
    </div>
  );
}

function TickerRow({
  stats,
  rowRef,
}: {
  stats: TickerStat[];
  rowRef: React.RefObject<HTMLDivElement>;
}) {
  const tripled = [...stats, ...stats, ...stats];

  return (
    <div ref={rowRef} className="flex w-max gap-3" style={{ willChange: 'transform' }}>
      {tripled.map((stat, index) => (
        <TickerTile key={`${index}-${stat.label}`} stat={stat} />
      ))}
    </div>
  );
}

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const rowOneRef = useRef<HTMLDivElement | null>(null);
  const rowTwoRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const update = () => {
      const section = sectionRef.current;
      const rowOne = rowOneRef.current;
      const rowTwo = rowTwoRef.current;
      if (!section || !rowOne || !rowTwo) return;

      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const offset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;

      // -33.333% keeps the middle copy of the tripled strip on screen so the
      // scroll-driven movement never exposes an empty edge.
      rowOne.style.transform = `translateX(calc(-33.333% + ${offset - 200}px))`;
      rowTwo.style.transform = `translateX(calc(-33.333% + ${-(offset - 200)}px))`;
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden bg-[#0C0C0C] pb-10 pt-16 sm:pt-20 md:pt-24"
    >
      <div className="flex flex-col gap-3">
        <TickerRow stats={ROW_ONE} rowRef={rowOneRef as React.RefObject<HTMLDivElement>} />
        <TickerRow stats={ROW_TWO} rowRef={rowTwoRef as React.RefObject<HTMLDivElement>} />
      </div>
    </section>
  );
}
