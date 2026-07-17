import FadeIn from '../components/FadeIn';

type TierStyle = 'hot' | 'warm' | 'open' | 'cold';

interface InterestTier {
  label: string;
  items: string[];
  style: TierStyle;
}

const TIERS: InterestTier[] = [
  {
    label: 'What I want to build in',
    style: 'hot',
    items: [
      'The new agent internet',
      'A2A negotiation',
      'Deep tech',
      'Infrastructure',
      'Agent observability',
      'Solutions for companies building their own models',
      'Agent economy',
      'AI tax systems',
    ],
  },
  {
    label: 'What I am curious about',
    style: 'warm',
    items: [
      'GPU optimization',
      'AI OS',
      'Hardware',
      'Defense tech',
      'Space tech',
      'B2C innovation',
      'DevOps',
      'Developer tools',
      'Claude in real life',
    ],
  },
  {
    label: 'Have not explored yet, but open',
    style: 'open',
    items: ['Gaming', 'Insurtech', 'Healthtech'],
  },
  {
    label: 'Not for me',
    style: 'cold',
    items: ['Education tech', 'Energy tech', 'Social impact'],
  },
];

const CHIP_STYLES: Record<TierStyle, string> = {
  hot: 'bg-[#C41E24] text-white px-5 py-2.5 text-sm md:text-base font-semibold',
  warm: 'border-2 border-[#C41E24] text-[#E8555A] px-4 py-2 text-sm md:text-base font-medium',
  open: 'border border-white/25 text-[#D7E2EA]/80 px-4 py-2 text-sm font-light',
  cold: 'border border-white/10 text-white/35 px-4 py-2 text-sm font-light line-through',
};

export default function InterestsSection() {
  return (
    <section
      id="interests"
      className="relative z-10 -mt-10 rounded-t-[40px] bg-[#0C0C0C] px-5 pb-10 pt-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:pt-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:pt-32"
    >
      <FadeIn y={40}>
        <h2
          className="hero-heading text-center font-black uppercase leading-none tracking-tight"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Interests
        </h2>
      </FadeIn>
      <FadeIn delay={0.1} y={20}>
        <p
          className="mt-4 text-center font-medium uppercase tracking-[0.2em] text-[#D7E2EA]"
          style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1.4rem)' }}
        >
          the spaces I want to build in (and the ones I don't)
        </p>
      </FadeIn>

      <div className="mx-auto mt-16 flex max-w-5xl flex-col sm:mt-20 md:mt-24">
        {TIERS.map((tier, index) => (
          <FadeIn key={tier.label} delay={index * 0.1} y={24}>
            <div
              className={`flex flex-col gap-4 py-8 md:flex-row md:items-start md:gap-10 md:py-10 ${
                index > 0 ? 'border-t border-white/10' : ''
              }`}
            >
              <span className="shrink-0 pt-2 text-sm font-semibold uppercase tracking-[0.2em] text-white/50 md:w-56">
                {tier.label}
              </span>
              <div className="flex flex-wrap gap-3">
                {tier.items.map((item) => (
                  <span key={item} className={`rounded-full ${CHIP_STYLES[tier.style]}`}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
