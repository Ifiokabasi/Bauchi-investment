import { client } from '@/sanity/client'

export default async function PostPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params

  console.log("SLUG PARAM:", slug)

  const query = `
    *[_type == "post" && slug.current == $slug][0]
  `

  const post = await client.fetch(query, {
    slug,
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