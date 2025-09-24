
import FeaturesSection from '@/components/landing/FeaturesSection';
import HeroSection from '@/components/landing/HeroSection';
import Navigation from '@/components/landing/Navigation';


const Index = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-[#313338]">
      <Navigation />
      <HeroSection/>

      <FeaturesSection />
    </div>
  );
};

export default Index;