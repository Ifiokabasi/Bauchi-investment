// src/app/blog/page.tsx
import { Suspense } from 'react';
import { getAllPosts, getFeaturedPost } from "@/sanity/lib/sanity";
import BlogHero from "./BlogHero";
import BlogGrid from "./BlogGrid";
import BlogFilterBar from "./BlogFilterBar";
import Footer from '../components/Footer/Footer';

export const revalidate = 60;

export const metadata = {
  title: "Insights & News | Bauchi Investment Corporation",
  description:
    "Stay up to date with the latest investment news, sector insights, project updates and economic analysis from Bauchi Investment Corporation.",
};

// ✅ Receive searchParams from the URL (server-side)
export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  // ✅ Await the searchParams promise
  const params = await searchParams;
  const category = params.category ?? "all";

  console.log(`📌 Blog page - category filter: ${category}`);

  const [featured, allPosts] = await Promise.all([
    getFeaturedPost(),
    getAllPosts(),
  ]);

  // ✅ Optional: Filter posts on the server based on category
  const filteredPosts = category === "all"
    ? allPosts
    : allPosts.filter((p) => p.category === category);

  const gridPosts = featured
    ? filteredPosts.filter((p) => p._id !== featured._id)
    : filteredPosts;

  return (
    <main className="blog-page">
      {featured && <BlogHero post={featured} />}
      <section className="blog-body">
        {/* ✅ Pass category as a prop - no useSearchParams() needed! */}
        <BlogFilterBar initialCategory={category} />
        <BlogGrid posts={gridPosts} />
        <Footer/>
      </section>
    </main>
  );
}