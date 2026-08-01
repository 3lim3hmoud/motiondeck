import { MarketingNavbar } from "@/components/marketing/navbar";
import { MarketingFooter } from "@/components/marketing/footer-and-cta";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col bg-canvas">
      <MarketingNavbar />
      <main id="main-content" className="flex-1">{children}</main>
      <MarketingFooter />
    </div>
  );
}
