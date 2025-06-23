// app/(authorLandingPage)/blogpage/[slug]/page.js

export const dynamic = 'force-dynamic' // 👈 Add this at the top
import { client, urlFor } from '@/lib/sanity'
import { PortableText } from '@portabletext/react'
import { format } from 'date-fns'
import { notFound, redirect } from 'next/navigation'

export async function generateStaticParams() {
  const slugs = await client.fetch(`*[_type == "post"]{ slug }`)
  const paths = slugs.map(post => ({ slug: post.slug.current }))
  console.log("✅ Available slugs:", paths)
  return paths
}

export default async function BlogPost({ params }) {
  const requestedSlug = params.slug

  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      title,
      publishedAt,
      mainImage,
      body,
      slug,
      author->{name, image},
      categories[]->{title}
    }`,
    { slug: requestedSlug }
  )

  if (post && post.slug.current !== requestedSlug) {
    redirect(`/blogpage/${post.slug.current}`)
  }

  if (!post) {
    console.warn("⚠️ Post not found for slug:", requestedSlug)
    return notFound()
  }

  console.log("✅ Fetched post:", post)

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-2">{post.title}</h1>

      <div className="text-gray-500 mb-4 text-sm">
        By {post.author?.name} · {format(new Date(post.publishedAt), 'PPP')}
      </div>

      {post.categories?.map(cat => (
        <span
          key={cat.title}
          className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded mr-2"
        >
          {cat.title}
        </span>
      ))}

      {post.mainImage && (
        <img
          src={urlFor(post.mainImage).width(1200).url()}
          alt={post.title}
          className="rounded-xl my-6"
        />
      )}

      <PortableText value={post.body} />
    </div>
  )
}
