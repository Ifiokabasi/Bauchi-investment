// src/app/blog/page.tsx
import { getAllPosts, getFeaturedPost } from "@/sanity/lib/sanity";
import BlogHero from "./BlogHero";
import BlogGrid from "./BlogGrid";
import BlogFilterBar from "./BlogFilterBar";

export const revalidate = 60;

export const metadata = {
  title: "Insights & News | Bauchi Investment Corporation",
  description:
    "Stay up to date with the latest investment news, sector insights, project updates and economic analysis from Bauchi Investment Corporation.",
};

export default async function BlogIndexPage() {
  const [featured, allPosts] = await Promise.all([
    getFeaturedPost(),
    getAllPosts(),
  ]);

  const gridPosts = featured
    ? allPosts.filter((p) => p._id !== featured._id)
    : allPosts;

  return (
    <main className="blog-page">
      {featured && <BlogHero post={featured} />}
      <section className="blog-body">
        <BlogFilterBar />
        <BlogGrid posts={gridPosts} />
      </section>
    </main>
  );
}