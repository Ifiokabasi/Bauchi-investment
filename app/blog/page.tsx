import {client} from '@/sanity/client'
import Link from 'next/link'

const query = `
*[_type == "post"] | order(publishedAt desc){
  title,
  slug,
  excerpt,
  mainImage
}
`

export default async function BlogPage() {
  const posts = await client.fetch(query)

  return (
    <main style={{padding: '40px'}}>
      <h1>Blog</h1>

      <div style={{display: 'grid', gap: '20px'}}>
        {posts.map((post: any) => (
          <Link key={post.slug.current} href={`/blog/${post.slug.current}`}>
            <div style={{border: '1px solid #ddd', padding: '20px'}}>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}