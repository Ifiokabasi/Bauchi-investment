import { client } from '@/sanity/client'

export default async function PostPage({
  params,
}: {
  params: { slug: string }
}) {
  // 🚨 DEBUG (important)
  console.log("SLUG PARAM:", params?.slug)

  if (!params?.slug) {
    return <div>Missing slug</div>
  }

  const query = `
    *[_type == "post" && slug.current == $slug][0]
  `

  const post = await client.fetch(query, {
    $slug: params.slug, // ✅ THIS FIXES YOUR ERROR
  })

  if (!post) {
    return <div>Post not found</div>
  }

  return (
    <main style={{ padding: '40px' }}>
      <h1>{post.title}</h1>
    </main>
  )
}