import Navbar from "../../components/Navbar"
import HeroSection from "./HeroSection"
import HowItWorksSection from "./HowItWorksSection"
import FeaturesSection from "./FeaturesSection"
import StatisticsSection from "./StatisticsSection"
import TestimonialsSection from "./TestimonialsSection"
import CallToActionSection from "./CallToActionSection"
import FooterSection from "./FooterSection"

function Landing() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <FeaturesSection />
        <StatisticsSection />
        <TestimonialsSection />
        <CallToActionSection />
      </main>
      <FooterSection />
    </>
  )
}

export default Landing
