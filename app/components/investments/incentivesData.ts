// components/Investments/incentivesData.ts
// Structured from: Bauchi State Investment Incentives Template (BICL)

export type IncentiveLevel = "State" | "Federal" | "State/Federal";

export interface Incentive {
  no: number;
  name: string;
  level: IncentiveLevel;
  sector: string;
  yearIntroduced: number;
  description: string;
  eligibility: string;
  legalInstrument: string;
  duration: string;
  implementingAgency: string;
  awardingAuthority: string;
}

export const incentives: Incentive[] = [
  {
    no: 1,
    name: "Tax Holidays",
    level: "State/Federal",
    sector: "All sectors",
    yearIntroduced: 2021,
    description:
      "One year tax holiday for large investors (₦100 million and above). Six month tax holiday for medium investors (₦25–₦100 million) and small investors (less than ₦25 million).",
    eligibility: "New large, medium, and small investors across all sectors.",
    legalInstrument: "Bauchi State Consolidated Tax Codification Law, 2021 / Finance Act 2020",
    duration: "1 year (large) or 6 months (medium/small) from business startup",
    implementingAgency: "Bauchi State Internal Revenue Service / Federal Inland Revenue Service",
    awardingAuthority: "Bauchi State Internal Revenue Service / Federal Inland Revenue Service",
  },
  {
    no: 2,
    name: "Waiver on Business Premises Registration",
    level: "State",
    sector: "All sectors",
    yearIntroduced: 2021,
    description:
      "Waiver granted on business premises registration for all new businesses.",
    eligibility: "All new businesses are eligible.",
    legalInstrument: "Executive Approval",
    duration: "2 years from initial year of business startup",
    implementingAgency: "Ministry of Commerce and Industry / Ministry of Cooperative, Small and Medium Enterprises",
    awardingAuthority: "Ministry of Commerce and Industry / Ministry of Cooperative, Small and Medium Enterprises",
  },
  {
    no: 3,
    name: "Downward Review of Right of Way (ROW) Charges",
    level: "State",
    sector: "Telecom / fibre optic & corporate organisations",
    yearIntroduced: 2021,
    description:
      "Reduction of right-of-way fees for fibre optic infrastructure from ₦1,500 to ₦145 per linear metre.",
    eligibility: "Telecom and corporate organisations laying fibre optic infrastructure.",
    legalInstrument: "Executive Approval on Downward Review of Right of Way Charges",
    duration: "Ongoing",
    implementingAgency: "Ministry of Power, Science, Technology and Telecom / Bauchi State Urban Development Board",
    awardingAuthority: "Ministry of Power, Science, Technology and Telecom",
  },
  {
    no: 4,
    name: "Free Allocation of Land",
    level: "State",
    sector: "All sectors",
    yearIntroduced: 2021,
    description:
      "Free land allocation to new businesses with an investment of ₦100 million and above.",
    eligibility: "New investors with investment of ₦100 million and above.",
    legalInstrument: "Bauchi State Land Use Act",
    duration: "Initial year of business commencement",
    implementingAgency: "BAGIS",
    awardingAuthority: "Ministry of Land and Survey",
  },
  {
    no: 5,
    name: "Waiver on Annual Ground Rent",
    level: "State",
    sector: "All sectors",
    yearIntroduced: 2021,
    description: "Waiver on annual ground rent for new investors at the initial stage.",
    eligibility: "Any new investor is eligible at the initial stage.",
    legalInstrument: "Bauchi State Land Use Act / Bauchi State Land Registration Law CAP",
    duration: "One-off",
    implementingAgency: "BAGIS",
    awardingAuthority: "Ministry of Land and Survey",
  },
  {
    no: 6,
    name: "Waiver on Processing Fee",
    level: "State",
    sector: "Manufacturing, Agro-Allied & Infrastructure",
    yearIntroduced: 2021,
    description:
      "Waiver on land title processing fees for manufacturing, agro-allied, and infrastructure projects.",
    eligibility: "All new investment in manufacturing, agro-allied, and infrastructure projects.",
    legalInstrument: "Bauchi State Land Use Act",
    duration: "One-off",
    implementingAgency: "BAGIS",
    awardingAuthority: "Ministry of Land and Survey",
  },
  {
    no: 7,
    name: "Tax Exemption on Re-invested Proceeds",
    level: "Federal",
    sector: "All sectors",
    yearIntroduced: 2004,
    description:
      "Gains accruing to unit holders in a trust from disposal of securities are not chargeable to tax, provided the proceeds are re-invested.",
    eligibility: "Proceeds must be re-invested.",
    legalInstrument: "Section 33, Capital Gains Tax Act (CGTA)",
    duration: "Per financial year",
    implementingAgency: "Federal Inland Revenue Service",
    awardingAuthority: "Nigerian Investment Promotion Commission",
  },
  {
    no: 8,
    name: "Pioneer Status Incentive",
    level: "Federal",
    sector: "Manufacturing, Agro-Allied & Infrastructure",
    yearIntroduced: 2007,
    description:
      "Tax holidays for companies in industries designated as Pioneer Industries under the Industrial Development Income Tax Relief Act (IDITRA).",
    eligibility:
      "Goods/services serve the public interest; the industry has favourable prospects for further development in Nigeria; goods/services exist but are undeveloped for economic growth; new applications must be made in the first year of production/service, with extensions requested no later than one month after expiry of the initial relief period; the applicant must operate in a listed pioneer industry/product and provide evidence of legal and regulatory compliance.",
    legalInstrument: "Industrial Development Income Tax Relief Act (IDITRA)",
    duration: "3 years initial, with possible 2-year extension or 1-year extension on request",
    implementingAgency: "Federal Inland Revenue Service",
    awardingAuthority: "Nigerian Investment Promotion Commission",
  },
  {
    no: 9,
    name: "Rural Investment Allowance",
    level: "Federal",
    sector: "Manufacturing, Agro-Allied & Infrastructure",
    yearIntroduced: 2020,
    description:
      "Companies incurring capital expenditure on facilities such as electricity, water, or tarred roads for trade/business purposes receive an additional allowance: no facility 100%, no water 30%, no electricity 50%, no tarred road 15%.",
    eligibility:
      "The company must be located at least 20 kilometres from such facilities provided by government; the allowance cannot be claimed if a reconstruction investment allowance has already been enjoyed; it applies only against profit in the year the facility was completed.",
    legalInstrument: "Section 34, Companies Income Tax Act (CITA)",
    duration: "Year of incurring capital expenditure",
    implementingAgency: "Federal Inland Revenue Service",
    awardingAuthority: "Nigerian Investment Promotion Commission",
  },
  {
    no: 10,
    name: "Tax Exemption for Small Companies / 20% for Medium Companies",
    level: "Federal",
    sector: "All sectors",
    yearIntroduced: 2020,
    description:
      "Small companies with turnover below ₦25 million are exempt from tax but must keep filing returns. Medium companies with investment above ₦25 million up to ₦100 million pay tax at 20%.",
    eligibility:
      "Annual turnover below ₦25 million (small) or ₦25–₦100 million (medium).",
    legalInstrument: "Finance Act 2020",
    duration: "When annual turnover exceeds ₦25 million",
    implementingAgency: "Federal Inland Revenue Service",
    awardingAuthority: "Nigerian Investment Promotion Commission / Federal Inland Revenue Service",
  },
  {
    no: 11,
    name: "Availability of Arable Land for Agro-Allied Activity",
    level: "State",
    sector: "Agro-Allied",
    yearIntroduced: 2021,
    description: "Easy access to arable land for agro-allied investors at concessionary rates.",
    eligibility: "Large-scale agro-allied investors.",
    legalInstrument: "Bauchi State Land Use Act",
    duration: "Initial year of business commencement",
    implementingAgency: "Ministry of Agric and Natural Resources",
    awardingAuthority: "Ministry of Land and Survey",
  },
  {
    no: 12,
    name: "One Stop Shop",
    level: "State",
    sector: "SMEs",
    yearIntroduced: 2018,
    description: "Brings together all processes of business start-up under one roof.",
    eligibility: "All new businesses are eligible.",
    legalInstrument: "—",
    duration: "Initial year of commencement",
    implementingAgency: "Bauchi Investment Corporation Limited",
    awardingAuthority: "Ministry of Commerce and Industry",
  },
  {
    no: 13,
    name: "Cadastral and Mining Sites",
    level: "State/Federal",
    sector: "Mining",
    yearIntroduced: 2021,
    description: "Acquisition of mining sites and licenses at concessionary rates.",
    eligibility: "Prospective investors in the mining sector.",
    legalInstrument: "Bauchi State Mining Act",
    duration: "Initial year of commencement",
    implementingAgency: "Ministry of Solid Minerals",
    awardingAuthority: "Ministry of Land and Survey",
  },
  {
    no: 14,
    name: "Opportunities for PPP",
    level: "State",
    sector: "Infrastructure, Mining & Agro-Allied",
    yearIntroduced: 2020,
    description:
      "Public-private partnership opportunities between prospective investors and Bauchi State Government, represented by BICL.",
    eligibility: "Investors in infrastructure, mining, and agro-allied industries.",
    legalInstrument: "—",
    duration: "Initial year of commencement",
    implementingAgency: "Bauchi Investment Corporation Limited",
    awardingAuthority: "Ministry of Commerce and Industry",
  },
  {
    no: 15,
    name: "Security",
    level: "State",
    sector: "All sectors",
    yearIntroduced: 2021,
    description: "Guaranteed security for all investors' investments.",
    eligibility: "All businesses.",
    legalInstrument: "—",
    duration: "Permanent",
    implementingAgency: "BASG / Security Agencies / Traditional and Community Leaders",
    awardingAuthority: "BASG / Federal Security Agencies",
  },
  {
    no: 16,
    name: "Provision of Technical Support Services",
    level: "State",
    sector: "All sectors",
    yearIntroduced: 2005,
    description: "Feasibility appraisals, Environmental Impact Assessments (EIA), and other technical support.",
    eligibility: "All businesses.",
    legalInstrument: "—",
    duration: "Initial year of commencement",
    implementingAgency: "Bauchi Investment Corporation Limited",
    awardingAuthority: "Ministry of Commerce and Industry",
  },
  {
    no: 17,
    name: "Market Support Linkage for Agric & Agro-Allied Investment",
    level: "State",
    sector: "Manufacturing, Agricultural & Agro-Allied",
    yearIntroduced: 2020,
    description:
      "Provides direct access to farmers' clusters and aggregators of various agricultural products and services.",
    eligibility: "All agricultural and agro-allied businesses.",
    legalInstrument: "—",
    duration: "One-off",
    implementingAgency: "Bauchi Investment Corporation Limited",
    awardingAuthority: "Ministry of Commerce and Industry",
  },
];

export const sectors = Array.from(new Set(incentives.map((i) => i.sector))).sort();
