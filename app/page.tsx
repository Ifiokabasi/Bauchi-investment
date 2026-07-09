// app/page.tsx
// Root homepage — imports each section component individually.

import Navbar    from "@/app/components/Navbar/Navbar";
import Hero      from "@/app/components/Hero/Hero";
import StatsBand from "@/app/components/StatsBand/StatsBand";
import Sectors   from "@/app/components/Sector/Sectors";
import Team      from "@/app/components/Team/Team";
import Footer    from "@/app/components/Footer/Footer";
import ContactPage from "@/app/components/Contact/ContactPage";
import AboutVideo from "@/app/components/About/AboutVideo";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <StatsBand />
      <Sectors />
      <Team />
      <AboutVideo />
      <ContactPage />
      <Footer/>
    </>
  );
}
