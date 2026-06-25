import InvestmentsHero from "../components/investments/InvestmentHero";
import IncentivesLedger from "../components/investments/IncentivesLedger";
import Footer from "../components/Footer/Footer";

export const metadata = {
  title: "Investment Opportunities | Bauchi Investment Corporation",
  description:
    "Discover lucrative investment opportunities across Bauchi State. From agriculture and real estate to infrastructure and energy. Download the full investment incentives schedule.",
};

export default function InvestmentsPageWrapper() {
  return (
    <main>
      <InvestmentsHero />
      <IncentivesLedger />
      <Footer/>
    </main>
  );
}
