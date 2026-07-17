import FadeIn from '../components/FadeIn';
import ContactButton from '../components/ContactButton';

const REASONS: string[] = [
  'We are both highly motivated and willing to sacrifice for this mission.',
  'We are both honest, and we understand that without uncompromised communication none of this is possible.',
  'We are not afraid to challenge the status quo, and we strive to change the world.',
  'We understand it is a marathon. Pivots, advisors, employees, market conditions: everything can change. What does not change is that we have each other to make it come true.',
  'We love innovation and never take reality as a given. We stay curious about how things work, because that is where we find the doorway to change things for the better.',
  'We ship fast and learn faster. Speed is our favorite unfair advantage.',
  'We argue about ideas, never about egos. The best argument wins, no matter whose it is.',
  'We put the company above comfort, titles, and the need to be right.',
  'We are obsessed with customers, not with our own ideas. If users do not feel it, it is not real.',
  'We have zero territory between us. Everyone talks to users, everyone sells, everyone cares about the product.',
  'We tell each other the truth early, especially when it is uncomfortable.',
  'We treat every "no" as data, not defeat. 6,000 cold messages taught me that.',
  'We celebrate the small wins loudly, study the losses honestly, and keep moving.',
  'We know unicorns are compounding machines: small daily wins, stacked for years, without breaking.',
  'We would rather chase a hard, honest problem than an easy, fake one.',
  'We measure ourselves by revenue and user love, not vanity metrics.',
  'We stay frugal. Every dollar buys learning or growth, nothing else.',
  'We play long-term games with long-term people, and it starts with us.',
  'We keep our sense of humor when everything is on fire. Some days it will be.',
  'We want to look back in ten years and say: we built something that mattered, and we built it together.',
];

export default function ReasonsSection() {
  return (
    <section id="reasons" className="bg-[#0C0C0C] px-5 pb-24 pt-16 sm:px-8 sm:pt-20 md:px-10">
      <FadeIn y={40}>
        <h2
          className="hero-heading text-center font-black uppercase leading-none tracking-tight"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          20 Reasons
        </h2>
      </FadeIn>
      <FadeIn delay={0.1} y={20}>
        <p
          className="mt-4 text-center font-medium uppercase tracking-[0.2em] text-[#D7E2EA]"
          style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1.4rem)' }}
        >
          we are going to build a unicorn together
        </p>
      </FadeIn>

      <div className="mx-auto mt-16 grid max-w-6xl gap-x-14 gap-y-8 sm:mt-20 md:mt-24 md:grid-cols-2">
        {REASONS.map((reason, index) => (
          <FadeIn key={index} delay={(index % 2) * 0.06} y={24}>
            <div className="flex items-start gap-5 border-t border-white/10 pt-6">
              <span
                className="font-black leading-none text-[#C41E24]"
                style={{ fontSize: 'clamp(1.6rem, 3vw, 2.6rem)' }}
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <p
                className="font-light leading-relaxed text-[#D7E2EA]"
                style={{ fontSize: 'clamp(0.95rem, 1.5vw, 1.15rem)' }}
              >
                {reason}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>

      <div className="mt-20 flex flex-col items-center gap-6 sm:mt-24">
        <FadeIn y={20}>
          <p
            className="text-center font-semibold text-white"
            style={{ fontSize: 'clamp(1.2rem, 2.4vw, 1.8rem)' }}
          >
            Sound like you?
          </p>
        </FadeIn>
        <FadeIn delay={0.1} y={20}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
}
