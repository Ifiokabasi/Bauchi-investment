// sanity/seed-posts.ts
// Run with: npx ts-node sanity/seed-posts.ts
// Or import manually into Sanity Studio via the "Import" feature.
// This file creates 6 sample blog posts for the BIC website.

import { createClient } from "@sanity/client";

import dotenv from "dotenv";
dotenv.config();



const client = createClient({
  projectId: "bpfdl4np",   
  dataset:   "production",
  apiVersion: "2024-01-01",
  token:     process.env.SANITY_WRITE_TOKEN,
  useCdn:    false,
});

const SAMPLE_POSTS = [
  {
    _type: "post",
    title: "BIC Facilitates ₦12 Billion Agriculture Investment Across Bauchi State",
    slug:  { _type: "slug", current: "bic-facilitates-12-billion-agriculture-investment" },
    category: "agriculture",
    featured: true,
    excerpt: "Bauchi Investment Corporation has successfully facilitated a landmark ₦12 billion agro-investment deal covering over 40,000 hectares of farmland, creating 8,000 direct jobs.",
    author: { name: "BIC Communications", role: "Media & Comms Desk" },
    publishedAt: "2025-09-15T09:00:00Z",
    readTime: 5,
    body: [
      {
        _type: "block",
        _key: "a1",
        style: "normal",
        children: [{ _type: "span", text: "Bauchi Investment Corporation (BIC) has successfully facilitated a landmark ₦12 billion agricultural investment deal covering over 40,000 hectares across three local government areas in Bauchi State. The investment, jointly structured with a consortium of Nigerian and international agro-firms, is expected to create over 8,000 direct jobs and significantly boost food production in the North-East region." }],
      },
      {
        _type: "block",
        _key: "a2",
        style: "normal",
        children: [{ _type: "span", text: "The BIC MD/CEO, speaking at the signing ceremony, noted that this deal represents the largest single agricultural investment in the state's history and aligns with the Governor's economic blueprint for 2025–2030. Value chain activities will span commodity farming, agro-processing, cold storage and export logistics." }],
      },
    ],
  },
  {
    _type: "post",
    title: "Bauchi Investment Corporation Launches CSCS Account Opening Drive for Citizens",
    slug:  { _type: "slug", current: "bic-cscs-account-opening-drive" },
    category: "capital-markets",
    featured: false,
    excerpt: "BIC Securities Ltd is rolling out a state-wide campaign to open CSCS accounts and activate e-dividends for Bauchi residents, bridging the gap between citizens and the Nigerian capital market.",
    author: { name: "BIC Securities Desk", role: "Portfolio & Capital Markets" },
    publishedAt: "2025-10-02T08:30:00Z",
    readTime: 4,
    body: [
      {
        _type: "block",
        _key: "b1",
        style: "normal",
        children: [{ _type: "span", text: "BIC Securities Limited, the licensed stockbroking subsidiary of Bauchi Investment Corporation, has launched an aggressive CSCS account opening drive targeting 25,000 new retail investors across Bauchi State by December 2025. The campaign will be executed through mobile outreach teams, local radio activations and partnerships with community associations." }],
      },
    ],
  },
  {
    _type: "post",
    title: "New Industrial Park to Transform Bauchi's Manufacturing Landscape",
    slug:  { _type: "slug", current: "new-industrial-park-bauchi-manufacturing" },
    category: "infrastructure",
    featured: false,
    excerpt: "Ground has been broken on a 200-hectare industrial park in the Yelwa corridor, set to host 60+ manufacturing firms and generate over 15,000 jobs by 2027.",
    author: { name: "Infrastructure Team", role: "Property & Infrastructure Division" },
    publishedAt: "2025-08-20T10:00:00Z",
    readTime: 6,
    body: [
      {
        _type: "block",
        _key: "c1",
        style: "normal",
        children: [{ _type: "span", text: "Bauchi State witnessed a historic moment as BIC broke ground on the Yelwa Industrial Park — a 200-hectare mixed-use industrial estate designed to anchor the state's manufacturing ambitions. The park will accommodate light and medium manufacturing, food processing, textile production and logistics firms, all clustered within a well-serviced investment zone with reliable power, road access and security." }],
      },
    ],
  },
  {
    _type: "post",
    title: "BIC Signs MOU With Three International Development Finance Institutions",
    slug:  { _type: "slug", current: "bic-mou-international-development-finance" },
    category: "partnerships",
    featured: false,
    excerpt: "Bauchi Investment Corporation has signed Memoranda of Understanding with the IFC, Proparco and the African Development Bank to unlock $200M in blended financing for state projects.",
    author: { name: "Partnerships Office", role: "Strategy & Partnerships Division" },
    publishedAt: "2025-07-11T11:00:00Z",
    readTime: 5,
    body: [
      {
        _type: "block",
        _key: "d1",
        style: "normal",
        children: [{ _type: "span", text: "In a significant milestone for Bauchi State's investment landscape, BIC has formalized partnerships with three of the world's leading development finance institutions — the IFC (World Bank Group), Proparco (France's DFI) and the African Development Bank. The MOUs, signed in Abuja, unlock access to a combined $200M blended financing facility targeting infrastructure, clean energy and agribusiness projects." }],
      },
    ],
  },
  {
    _type: "post",
    title: "Solar Energy Investment Opens Doors for 140 Rural Communities in Bauchi",
    slug:  { _type: "slug", current: "solar-energy-investment-rural-bauchi" },
    category: "energy",
    featured: false,
    excerpt: "A new solar mini-grid programme co-financed by BIC will bring reliable electricity to over 140 communities, powering homes, schools, health centres and agro-enterprises.",
    author: { name: "BIC Energy Desk", role: "Energy & Renewables Unit" },
    publishedAt: "2025-06-05T09:00:00Z",
    readTime: 4,
    body: [
      {
        _type: "block",
        _key: "e1",
        style: "normal",
        children: [{ _type: "span", text: "BIC has co-financed a ₦4.8 billion solar mini-grid programme that will deliver clean, reliable electricity to 140 rural communities across seven local government areas in Bauchi State. Each installation will power between 200 and 500 households, alongside schools, primary health centres and agro-processing units, dramatically reducing diesel dependency and opening new economic opportunities." }],
      },
    ],
  },
  {
    _type: "post",
    title: "How BIC's Consultancy Arm Helped 28 SMEs Secure Growth Financing in 2025",
    slug:  { _type: "slug", current: "bic-consultancy-sme-financing-2025" },
    category: "investment",
    featured: false,
    excerpt: "BIC's Consultancy Services team completed 28 feasibility studies and business plans this year, resulting in ₦3.2 billion in approved financing for Bauchi-based small businesses.",
    author: { name: "BIC Consultancy Team", role: "Consultancy Services Division" },
    publishedAt: "2025-11-01T08:00:00Z",
    readTime: 5,
    body: [
      {
        _type: "block",
        _key: "f1",
        style: "normal",
        children: [{ _type: "span", text: "BIC's Consultancy Services Division closed 2025 with its strongest performance to date — completing 28 technical and commercial feasibility studies for small and medium enterprises across Bauchi State. These engagements resulted in ₦3.2 billion in approved financing from commercial banks, development finance institutions and the Bank of Industry, creating an estimated 2,100 new jobs across multiple sectors." }],
      },
    ],
  },
];

async function seedPosts() {
  console.log("Seeding sample posts to Sanity...");
  for (const post of SAMPLE_POSTS) {
    const result = await client.create(post);
    console.log(`✓ Created: ${result.title} (${result._id})`);
  }
  console.log("✅ All posts seeded successfully.");
}

seedPosts().catch(console.error);
