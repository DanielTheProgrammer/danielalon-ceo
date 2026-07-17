import FadeIn from '../components/FadeIn';
import PartnerEquation from '../components/PartnerEquation';

export default function HeroSection() {
  return (
    <section className="relative flex h-screen flex-col" style={{ overflowX: 'clip' }}>
      <div className="absolute inset-0 z-0">
        <img
          src="/bridge-bg-sunny.jpg"
          alt=""
          className="h-full w-full object-cover object-center"
          style={{ filter: 'brightness(1.12) saturate(1.18)' }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(12, 12, 12, 0.22) 0%, rgba(12, 12, 12, 0.02) 38%, rgba(12, 12, 12, 0.35) 72%, #0C0C0C 100%)',
          }}
        />
      </div>

      <div className="relative z-10 overflow-hidden">
        <FadeIn delay={0.15} y={40}>
          <h1 className="hero-heading-white mt-6 w-full whitespace-nowrap text-center text-[15vw] font-black uppercase leading-none tracking-tight drop-shadow-[0_1px_10px_rgba(0,0,0,0.30)] sm:mt-4 sm:text-[13vw] sm:drop-shadow-[0_3px_16px_rgba(0,0,0,0.45)] md:mt-2 md:text-[14vw] lg:text-[15vw]">
            Hi, i&apos;m daniel
          </h1>
        </FadeIn>
      </div>

      <div className="relative z-10 flex flex-1 items-center justify-center pb-10">
        <FadeIn delay={0.6} y={30}>
          <PartnerEquation />
        </FadeIn>
      </div>
    </section>
  );
}
