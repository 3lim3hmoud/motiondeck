import type { Metadata } from "next";
import { Hero } from "@/components/marketing/hero";
import { SocialProof } from "@/components/marketing/social-proof";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { FeatureShowcase } from "@/components/marketing/feature-showcase";
import { TemplatesCarousel } from "@/components/marketing/templates-carousel";
import { UseCaseTabs } from "@/components/marketing/use-case-tabs";
import { PricingTeaser } from "@/components/marketing/pricing-teaser";
import { FinalCta } from "@/components/marketing/footer-and-cta";

export const metadata: Metadata = {
  title: "MotionDeck — Turn documents into animated presentations",
  description:
    "MotionDeck uses AI to transform documents, PDFs, and text into beautiful, interactive animated web presentations.",
};

export default function LandingPage() {
  return (
    <>
      <Hero />
      <SocialProof />
      <HowItWorks />
      <FeatureShowcase />
      <TemplatesCarousel />
      <UseCaseTabs />
      <PricingTeaser />
      <FinalCta />
    </>
  );
}
