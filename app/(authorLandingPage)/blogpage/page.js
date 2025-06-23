// app/(authorLandingPage)/blogpage/page.js
import Link from 'next/link'
import { client, urlFor } from '@/lib/sanity'
import { PortableText } from '@portabletext/react'
import { format } from 'date-fns'

export const revalidate = 60 // ISR

export default async function BlogPage() {
  const posts = await client.fetch(`
    *[_type == "post"] | order(publishedAt desc){
      _id,
      title,
      slug,
      publishedAt,
      body,
      mainImage,
      author->{
        name,
        image
      },
      categories[]->{
        title
      }
    }
  `)

  if (!posts || posts.length === 0) {
    return <div className="p-8">No blog posts found</div>
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      {posts.map(post => (
        <div key={post._id} className="mb-12 border-b pb-8">
          <Link href={`/blogpage/${post.slug.current}`}>
  <h2 className="text-2xl font-bold text-blue-700 hover:underline mb-2">
    {post.title}
  </h2>
</Link>


          <div className="text-sm text-gray-500 mb-2">
            {post.author?.name && <>By {post.author.name}</>}
            {post.publishedAt && (
              <> · {format(new Date(post.publishedAt), 'PPP')}</>
            )}
          </div>

          <div className="mb-2">
            {post.categories?.map(cat => (
              <span
                key={cat.title}
                className="inline-block bg-gray-100 text-gray-600 text-xs font-medium mr-2 px-2 py-1 rounded"
              >
                {cat.title}
              </span>
            ))}
          </div>

          {post.mainImage && (
            <img
              src={urlFor(post.mainImage).width(800).url()}
              alt={post.title}
              className="mb-4 rounded-xl shadow"
            />
          )}

          <PortableText value={post.body} />
        </div>
      ))}
    </div>
  )
}
