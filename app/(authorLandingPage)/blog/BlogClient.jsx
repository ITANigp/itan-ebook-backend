'use client'

import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import { useState } from 'react'

export default function BlogClient({ posts }) {
  const [showModal, setShowModal] = useState(false)

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

      {/* Subscription Section */}
      <div className="mt-20 border-t pt-10 text-center">
        <h2 className="text-2xl font-bold mb-4">Become an Insider</h2>
        <p className="text-gray-600 mb-6">
          Get early access to big things.
        </p>
        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Join The Community
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-md w-[90%] max-w-md">
            <h2 className="text-xl font-semibold mb-4">Subscribe to Our Newsletter</h2>
            <form
              action="/api/subscribe"
              method="POST"
              className="flex flex-col gap-4"
            >
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
