import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "../styles/globals.css";
import "./fontawesome";
import Navbar from "./components/Navbar/Navbar";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // optional but recommended
});

export const metadata: Metadata = {
  title: {
    default: "Bauchi Investment Corporation",
    template: "%s | Bauchi Investment Corporation",
  },
  description: "Catalyzing Investment, Powering Prosperity.",
  metadataBase: new URL("https://yourdomain.com"),
  openGraph: {
    title: "Bauchi Investment Corporation",
    description: "Catalyzing Investment, Powering Prosperity.",
    url: "https://yourdomain.com",
    siteName: "Bauchi Investment Corporation",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },

   icons: {
    icon: "/flavicon.ico",
  },
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${montserrat.variable} h-full antialiased`}
    >
      <Navbar/>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
