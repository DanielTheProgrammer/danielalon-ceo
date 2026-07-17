import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FadeIn from '../components/FadeIn';
import JourneyCanvas from '../components/JourneyCanvas';

gsap.registerPlugin(ScrollTrigger);

interface TimelineStop {
  number: string;
  title: string;
  intro?: string;
  metrics?: string[];
  bullets?: string[];
  link?: { href: string; label: string };
}

const TIMELINE: TimelineStop[] = [
  {
    number: '01',
    title: 'Started coding at 12',
    intro: 'Mainly games and websites for my friends.',
  },
  {
    number: '02',
    title: 'Israeli Air Force: Backend Developer',
    metrics: ['Led 8 engineers'],
    bullets: [
      'Java, Spring, Hibernate.',
      'Developed life-saving systems gathering 40 different data sources into one product, using insights and prediction models to help users make wiser decisions on time.',
      'Four years in a high-velocity environment with no room for compromise on quality and accountability.',
    ],
  },
  {
    number: '03',
    title: 'Computer Science, Tel Aviv University',
    intro: 'Active in the swimming team, the VC club, and the startup scouters committee.',
  },
  {
    number: '04',
    title: 'Published my first app, solo',
    intro: 'Helping Tel Aviv drivers find parking fast and cheap (built with Flutter, pre-AI).',
    metrics: ['1,000 downloads in 24h', '#5 on App Store', '$5K ARR', '10,000 users'],
    bullets: ['Zero marketing budget, all organic.'],
    link: {
      href: 'https://apps.apple.com/il/app/%D7%97%D7%A0%D7%99%D7%AA%D7%9C/id6444135153',
      label: 'חניתל on the App Store',
    },
  },
  {
    number: '05',
    title: 'Playtika (NASDAQ: PLTK), Machine Learning Engineer',
    metrics: ['Company contest winner'],
    bullets: [
      'Worked closely with data scientists and ML researchers.',
      'Trained and fine-tuned prediction and retargeting models on Playtika’s massive data.',
      'Won a company contest by building an agent-based ticket system for the IT department, on my free time.',
    ],
  },
  {
    number: '06',
    title: 'Founded Strike, CEO',
    intro: 'With my co-founder. Strike’s mission: help B2B tech companies revive their closed-lost deals.',
    metrics: ['$100K raised', '6,000 CROs reached', '100 interviews'],
    bullets: [
      'Pivoted twice before this idea. We were trying to solve a non-existing problem.',
      'Decided to start from nothing a third time, but this time with deep ideation.',
      'Manually outreached 6,000 American CROs in a month to get exploration calls.',
      'Outreached and used my network to contact and pitch GTM leaders around the world, leading to our first angel checks: $100K cumulative.',
      'Conducted 82 interviews with CROs, VP Sales, and VP Revenue Operations. At interview #83 we noticed that closed-lost deals really triggered the VP Sales we talked to (Datarails).',
      'Our next 17 interviews focused on revenue leaders’ current closed-lost strategy. I learned three things: every B2B tech SaaS company has many closed-lost deals, it’s really painful for them, and they’re willing to pay for a solution.',
      'In two days we developed a demo and showed it to new and past interviewees. We closed our first POC without having a company name or incorporation.',
      'Developed an MVP in two weeks and gave immediate value to our first POC, then closed 2 more POCs with past interviewees.',
      'Interviewed at YC twice, didn’t get an offer.',
      'Got accepted to the Antler residency program in NYC. I moved there alone to be close to our users, and saw how much personal connection affects revenue and deals.',
    ],
  },
  {
    number: '07',
    title: 'Solo-founded ActinGym, my side hustle',
    intro:
      'Actors send 100-300 taped auditions a year without getting any feedback. ActinGym analyzes their audition and builds an acting class to help them nail the next take.',
    metrics: ['$4K MRR', '500K views in month one', '2.9-4.5 ROAS'],
    bullets: [
      'Built it in 10 days using Opus 4.8.',
      'Created automated mass-content machines that went viral: 7,000 followers in the first month. 4 accounts, 3 posts a day, bringing paid customers automatically.',
    ],
    link: {
      href: 'https://apps.apple.com/us/app/actingym-nail-the-audition/id6765903390',
      label: 'ActinGym on the App Store',
    },
  },
  {
    number: '08',
    title: 'Looking to build a unicorn :)',
  },
];

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(
    () => window.matchMedia('(min-width: 768px)').matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    const onChange = (event: MediaQueryListEvent) => setIsDesktop(event.matches);
    mediaQuery.addEventListener('change', onChange);
    return () => mediaQuery.removeEventListener('change', onChange);
  }, []);

  return isDesktop;
}

function MetricChips({ metrics, className = '' }: { metrics: string[]; className?: string }) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {metrics.map((metric) => (
        <span
          key={metric}
          className="rounded-full bg-[#C41E24] px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-wide text-white"
        >
          {metric}
        </span>
      ))}
    </div>
  );
}

function StopCard({ stop }: { stop: TimelineStop }) {
  const isFinale = !stop.intro && !stop.bullets;
  const isWide = (stop.bullets?.length ?? 0) > 5;

  if (isFinale) {
    return (
      <article className="flex h-[320px] w-[420px] max-w-[86vw] shrink-0 items-center justify-center rounded-3xl bg-[#0C0C0C] p-10 text-center">
        <div>
          <img src="/decor-unicorn.png" alt="" className="mx-auto w-20" />
          <h3 className="mt-5 text-3xl font-black uppercase leading-tight text-white">
            {stop.title}
          </h3>
        </div>
      </article>
    );
  }

  return (
    <article
      className={`shrink-0 rounded-3xl border border-[#0C0C0C]/10 bg-white/85 p-7 shadow-[0_10px_50px_rgba(12,12,12,0.07)] backdrop-blur-sm ${
        isWide ? 'w-[740px]' : 'w-[460px]'
      } max-w-[86vw]`}
    >
      <h3 className="text-xl font-semibold uppercase leading-tight text-[#0C0C0C] lg:text-2xl">
        {stop.title}
      </h3>
      {stop.metrics && <MetricChips metrics={stop.metrics} className="mt-3" />}
      {stop.intro && (
        <p className="mt-3 text-[0.9rem] font-light leading-relaxed text-[#0C0C0C]/70">
          {stop.intro}
        </p>
      )}
      {stop.bullets && (
        <ul className={`mt-4 gap-x-8 ${isWide ? 'columns-2' : ''}`}>
          {stop.bullets.map((bullet, index) => (
            <li
              key={index}
              className="mb-2 flex break-inside-avoid items-start gap-2 text-[0.85rem] font-light leading-relaxed text-[#0C0C0C]/70"
            >
              <span className="font-semibold text-[#C41E24]">+</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      )}
      {stop.link && (
        <a
          href={stop.link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block text-[0.85rem] font-semibold text-[#C41E24] underline underline-offset-4 hover:opacity-70"
        >
          {stop.link.label} ↗
        </a>
      )}
    </article>
  );
}

function DesktopJourney() {
  const pinRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef(0);

  useEffect(() => {
    const pinTarget = pinRef.current;
    const track = trackRef.current;
    if (!pinTarget || !track) return;

    const getDistance = () => Math.max(track.scrollWidth - window.innerWidth, 0);

    const tween = gsap.to(track, {
      x: () => -getDistance(),
      ease: 'none',
      scrollTrigger: {
        trigger: pinTarget,
        start: 'top top',
        end: () => `+=${getDistance()}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          progressRef.current = self.progress;
          if (progressBarRef.current) {
            progressBarRef.current.style.transform = `scaleX(${self.progress})`;
          }
        },
      },
    });

    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <div ref={pinRef} className="relative h-screen overflow-hidden">
      <JourneyCanvas progressRef={progressRef} stopCount={TIMELINE.length} />
      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-end justify-between px-10 pb-2 pt-12 lg:px-14">
          <FadeIn y={30}>
            <h2
              className="font-black uppercase leading-none tracking-tight text-[#0C0C0C]"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 88px)' }}
            >
              My Journey
            </h2>
          </FadeIn>
          <div className="mb-3 h-1 w-44 overflow-hidden rounded-full bg-[#0C0C0C]/10 lg:w-64">
            <div
              ref={progressBarRef}
              className="h-full w-full origin-left rounded-full bg-[#C41E24]"
              style={{ transform: 'scaleX(0)' }}
            />
          </div>
        </div>
        <div className="flex-1 overflow-hidden">
          <div
            ref={trackRef}
            className="relative flex h-full w-max items-stretch gap-12 px-[6vw] pb-[70px]"
          >
            {/* The metro line: runs under every station across the whole track */}
            <div className="absolute bottom-[82px] left-[3vw] right-[3vw] h-[3px] rounded-full bg-[#C41E24]" />
            {TIMELINE.map((stop) => (
              <div key={stop.number} className="relative flex flex-col items-center">
                <div className="flex-1" />
                <StopCard stop={stop} />
                {/* Stem stretches from the card down to its station on the line */}
                <div className="min-h-6 w-[3px] flex-1 bg-[#C41E24]" />
                <div className="z-10 flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#C41E24] bg-white text-[0.7rem] font-black text-[#C41E24]">
                  {stop.number}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileJourney() {
  return (
    <div className="px-5 py-20 sm:px-8 sm:py-24">
      <FadeIn y={40}>
        <h2
          className="mb-16 text-center font-black uppercase leading-none tracking-tight text-[#0C0C0C] sm:mb-20"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          My Journey
        </h2>
      </FadeIn>

      <div className="mx-auto max-w-5xl">
        {TIMELINE.map((stop, index) => (
          <FadeIn key={stop.number} delay={index * 0.1}>
            <div
              className={`flex items-start gap-8 py-8 sm:gap-12 sm:py-10 ${
                index > 0 ? 'border-t border-[#0C0C0C]/15' : ''
              }`}
            >
              <span
                className="font-black leading-none text-[#0C0C0C]"
                style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
              >
                {stop.number}
              </span>
              <div className="flex flex-col gap-3 pt-2 sm:gap-4">
                <h3
                  className="font-medium uppercase leading-tight text-[#0C0C0C]"
                  style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                >
                  {stop.title}
                </h3>
                {stop.metrics && <MetricChips metrics={stop.metrics} />}
                {stop.intro && (
                  <p
                    className="max-w-2xl font-light leading-relaxed text-[#0C0C0C] opacity-60"
                    style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}
                  >
                    {stop.intro}
                  </p>
                )}
                {stop.bullets && (
                  <ul className="flex max-w-2xl flex-col gap-2">
                    {stop.bullets.map((bullet, bulletIndex) => (
                      <li
                        key={bulletIndex}
                        className="flex items-start gap-3 font-light leading-relaxed text-[#0C0C0C] opacity-60"
                        style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}
                      >
                        <span className="font-semibold opacity-70">+</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {stop.link && (
                  <a
                    href={stop.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[#C41E24] underline underline-offset-4"
                    style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}
                  >
                    {stop.link.label} ↗
                  </a>
                )}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}

export default function JourneySection() {
  const isDesktop = useIsDesktop();

  return (
    <section
      id="journey"
      className="rounded-t-[40px] bg-[#FFFFFF] sm:rounded-t-[50px] md:rounded-t-[60px]"
    >
      {isDesktop ? <DesktopJourney /> : <MobileJourney />}
    </section>
  );
}
