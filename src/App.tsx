import HeroSection from './sections/HeroSection';
import MarqueeSection from './sections/MarqueeSection';
import AboutSection from './sections/AboutSection';
import JourneySection from './sections/JourneySection';
import InterestsSection from './sections/InterestsSection';
import ReasonsSection from './sections/ReasonsSection';

export default function App() {
  return (
    <main className="bg-[#0C0C0C]" style={{ overflowX: 'clip', fontFamily: "'Kanit', sans-serif" }}>
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <JourneySection />
      <InterestsSection />
      <ReasonsSection />
    </main>
  );
}
