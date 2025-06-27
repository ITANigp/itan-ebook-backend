// app/(authorLandingPage)/blog/page.jsx

import Link from 'next/link'
import Image from 'next/image'
import { client, urlFor } from '@/lib/sanity'
import { Suspense } from 'react'

export const revalidate = 60 // ✅ ISR

export default async function BlogPage() {
  const query = `*[_type == "post" && defined(slug.current)] | order(_createdAt desc){
    _id,
    title,
    slug,
    body,
    mainImage,
    author->{
      name,
      image
    }
  }`

  const posts = await client.fetch(query)

  const calculateReadingTime = (text) => {
    const wordsPerMinute = 200
    const words = text?.reduce((acc, block) => {
      if (block._type === 'block' && block.children) {
        return acc + block.children.map(child => child.text).join(' ').split(' ').length
      }
      return acc
    }, 0)
    const minutes = Math.ceil(words / wordsPerMinute)
    return { words, minutes }
  }

  const getSnippet = (body) => {
    const firstBlock = body?.find(block => block._type === 'block')
    if (!firstBlock || !firstBlock.children) return ''
    const fullText = firstBlock.children.map(child => child.text).join(' ')
    return fullText.length > 180 ? fullText.slice(0, 180) + '...' : fullText
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-10 text-center">Blog Posts...</h1>

      {posts.map(post => {
        const { words, minutes } = calculateReadingTime(post.body || [])
        const snippet = getSnippet(post.body)

        return (
          <div key={post._id} className="mb-12 border-b pb-10">
            <Link href={`/blog/${post.slug.current}`}>
              <h2 className="text-2xl font-bold text-black underline hover:text-gray-800 transition mb-3">
                {post.title}
              </h2>
            </Link>

            {post.mainImage && (
              <Link href={`/blog/${post.slug.current}`}>
                <img
                  src={urlFor(post.mainImage).width(800).url()}
                  alt={post.title}
                  className="rounded-lg mb-4 w-full h-64 object-cover hover:opacity-90 transition"
                />
              </Link>
            )}

            <p className="text-gray-700 mb-4">{snippet}</p>

            <div className="flex items-center gap-3 text-sm text-gray-600 mb-2">
              {post.author?.image && (
                <Image
                  src={urlFor(post.author.image).width(40).height(40).url()}
                  alt={post.author.name}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              )}
              <span>
                By <span className="font-medium">{post.author?.name || 'Unknown'}</span> • {minutes} min read · {words} words
              </span>
            </div>

            <Link
              href={`/blog/${post.slug.current}`}
              className="text-blue-600 text-sm font-medium hover:underline"
            >
              Read more →
            </Link>
          </div>
        )
      })}

      {/* Subscription Form Section */}
      <div className="mt-20 border-t pt-10">
        <h2 className="text-2xl font-bold mb-4 text-center">Join Our Newsletter</h2>
        <p className="text-center text-gray-600 mb-6">
          Get updates about new blog posts, publishing tips, and more.
        </p>

        <form
          action="/api/subscribe" // Your API route for ConvertKit (or external action URL)
          method="POST"
          className="max-w-md mx-auto flex flex-col sm:flex-row items-center gap-4"
        >
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  )
}
