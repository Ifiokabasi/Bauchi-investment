// src/app/blog/page.tsx

import ContactPage from "../components/Contact/ContactPage";
import ContactHero from "../components/Contact/ContactHero"



export const metadata = {
  title: "Contact Us | Bauchi Investment Corporation",
  description:
    "Let us know we can serve at Bauchi Investment Corporation.",
};

export default function contactPage() {
 

  return (
    <main>
        <ContactHero/>
        <ContactPage/>

      
    </main>
  );
}