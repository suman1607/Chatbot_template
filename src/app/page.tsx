import { Navbar } from "@/components/layout/navbar";
import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { FaqSection } from "@/components/landing/faq-section";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        <PricingSection />
        <TestimonialsSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}
