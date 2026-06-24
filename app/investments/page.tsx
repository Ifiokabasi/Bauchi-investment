// app/investments/page.tsx
import InvestmentsHero from "../components/investments/InvestmentHero";


export const metadata = {
  title: "Investment Opportunities | Bauchi Investment Corporation",
  description:
    "Discover lucrative investment opportunities across Bauchi State. From agriculture and real estate to infrastructure and energy.",
};

export default function InvestmentsPageWrapper() {
  return (
    <main>
      <InvestmentsHero />
    </main>
  );
}