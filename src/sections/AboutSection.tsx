import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import FadeIn from '../components/FadeIn';

const BULLETS: { lead: string; rest: string }[] = [
  {
    lead: 'It’s not my first company.',
    rest: 'I was CEO of a NYC-based B2B SaaS company: raised an angel round, built the GTM strategy hands-on, and scaled it to $30K ARR.',
  },
  {
    lead: 'I’m an engineer who became a CEO/GTM founder.',
    rest: 'I started coding at 12, worked as a backend engineer in the Israeli Air Force, then as an ML engineer at an IPOed company (NASDAQ: PLTK). I understand how technical people think, build, evaluate products, and buy.',
  },
  {
    lead: 'I can sell technical products because I’m technical myself.',
    rest: 'I know how to translate complex products into business pain, and I won’t ask engineering to build things I can’t explain, sell, or validate.',
  },
  {
    lead: 'At the beginning of my first startup I manually reached 6,000 US CROs and VP Sales.',
    rest: 'I ran sales calls with C-level buyers, handled objections, followed leads through conferences, and closed deals. We talked with more than 150 CROs and made our first sales during discovery calls, with no product.',
  },
  {
    lead: 'Selling to sales leaders taught me how revenue teams actually work:',
    rest: 'sales cycles, pipeline pain, CRM workflows, buying committees, objections, urgency, and what makes a company pay now instead of “maybe later.”',
  },
  {
    lead: 'I solo-built two B2C apps.',
    rest: 'The latest launched two weeks ago and already generated $4K. I also built autonomous content machines posting 12 times a day, generating 300K views/week, and bringing most paid customers organically.',
  },
  {
    lead: 'I’m not looking for a CTO to “just build the idea.” I’m looking for a real partner.',
    rest: 'I can own customers, GTM, fundraising, positioning, and distribution, while still being technical enough to contribute to product and code when needed.',
  },
];

// Placeholder photos: swap src/caption when the real polaroids arrive.
interface PolaroidPhoto {
  src: string;
  caption: string;
  rotation: number;
  offsetX: number;
}

const PHOTOS: PolaroidPhoto[] = [
  { src: '/pile-deal.jpg', caption: 'Closing our first deal together', rotation: -6, offsetX: -16 },
  { src: '/pile-interview.jpg', caption: 'Our first interview', rotation: 5, offsetX: 18 },
  { src: '/pile-employee100.jpg', caption: 'Hiring our 100th employee', rotation: -3, offsetX: 6 },
  { src: '/pile-ipo.jpg', caption: 'Our IPO day', rotation: 8, offsetX: -20 },
];

function Polaroid({ photo, dropOrder }: { photo: PolaroidPhoto; dropOrder: number }) {
  return (
    <motion.div
      // Re-keyed on every re-drop so the landing animation replays.
      className="absolute inset-0 flex items-center justify-center"
      initial={{ opacity: 0, y: -140, rotate: photo.rotation * 2.4, scale: 1.14 }}
      animate={{ opacity: 1, y: 0, rotate: photo.rotation, scale: 1 }}
      transition={{
        type: 'spring',
        stiffness: 170,
        damping: 20,
        opacity: { duration: 0.25 },
      }}
      style={{ x: photo.offsetX, zIndex: dropOrder }}
    >
      <div className="w-[320px] bg-white p-3 pb-16 shadow-[0_18px_50px_rgba(12,12,12,0.5)] sm:w-[390px] lg:w-[470px]">
        <div className="aspect-[4/3] w-full overflow-hidden bg-[#E8E6DF]">
          <img src={photo.src} alt={photo.caption} className="h-full w-full object-cover" />
        </div>
        <p
          className="mt-4 text-center text-3xl leading-none text-[#3A3A3A]"
          style={{ fontFamily: "'Caveat', cursive" }}
        >
          {photo.caption}
        </p>
      </div>
    </motion.div>
  );
}

export default function AboutSection() {
  // Total number of drops so far; photo (drops - 1) % PHOTOS.length is on top.
  // Runs from page load (not gated on scroll), a new photo every 3 seconds.
  const [drops, setDrops] = useState(1);

  useEffect(() => {
    const intervalId = setInterval(() => setDrops((current) => current + 1), 3000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <section
      id="about"
      className="relative flex min-h-screen flex-col items-center justify-center px-5 py-20 sm:px-8 md:px-10"
    >
      <div className="pointer-events-none absolute left-[1%] top-[3%] w-[80px] opacity-90 sm:w-[110px] md:left-[2%] md:w-[150px]">
        <FadeIn delay={0.1} duration={0.9} x={-80} y={0}>
          <img src="/decor-rocket.png" alt="" className="w-full -rotate-12" />
        </FadeIn>
      </div>
      <div className="pointer-events-none absolute right-[1%] top-[3%] w-[80px] opacity-90 sm:w-[110px] md:right-[2%] md:w-[150px]">
        <FadeIn delay={0.15} duration={0.9} x={80} y={0}>
          <img src="/decor-bulb.png" alt="" className="w-full rotate-12" />
        </FadeIn>
      </div>
      <div className="pointer-events-none absolute bottom-[1%] left-[1%] w-[70px] opacity-90 sm:w-[95px] md:w-[120px]">
        <FadeIn delay={0.25} duration={0.9} x={-80} y={0}>
          <img src="/decor-chart.png" alt="" className="w-full" />
        </FadeIn>
      </div>

      <div className="flex w-full flex-col items-center gap-14 sm:gap-16 md:gap-20">
        <FadeIn delay={0} y={40}>
          <h2
            className="hero-heading text-center font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            About me
          </h2>
        </FadeIn>

        <div className="mx-auto grid w-full max-w-7xl gap-14 md:grid-cols-2 md:gap-12 lg:gap-20">
          <div className="flex flex-col gap-6 sm:gap-7">
            <FadeIn y={24}>
              <p
                className="font-semibold text-white"
                style={{ fontSize: 'clamp(1.15rem, 2.2vw, 1.5rem)' }}
              >
                Why a strong CTO should want to work with me:
              </p>
            </FadeIn>
            {BULLETS.map((bullet, index) => (
              <FadeIn key={index} delay={(index + 1) * 0.08} y={24}>
                <div className="flex items-start gap-4 sm:gap-5">
                  <span
                    className="font-black leading-relaxed text-white/70"
                    style={{ fontSize: 'clamp(1rem, 1.8vw, 1.3rem)' }}
                  >
                    +
                  </span>
                  <p
                    className="leading-relaxed text-[#D7E2EA]"
                    style={{ fontSize: 'clamp(0.95rem, 1.6vw, 1.15rem)' }}
                  >
                    <span className="font-semibold text-white">{bullet.lead}</span>{' '}
                    <span className="font-light">{bullet.rest}</span>
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          <div className="relative h-[600px] md:sticky md:top-[calc(50vh-370px)] md:h-[740px] md:self-start">
            {PHOTOS.map((photo, index) => {
              // Most recent drop number for this photo (0 = not dropped yet).
              const cyclesCompleted = Math.floor((drops - 1 - index) / PHOTOS.length);
              const lastDrop = drops > index ? index + 1 + cyclesCompleted * PHOTOS.length : 0;
              if (lastDrop === 0) return null;
              return <Polaroid key={`${index}-${lastDrop}`} photo={photo} dropOrder={lastDrop} />;
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
