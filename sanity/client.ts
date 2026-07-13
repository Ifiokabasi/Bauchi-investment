import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "bpfdl4np",
  dataset: "production",
  apiVersion: "2024-03-19",
  useCdn: true,
});