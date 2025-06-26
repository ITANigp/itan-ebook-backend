'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { client, urlFor } from '@/lib/sanity'

export default function BlogPage() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      const query = `*[_type == "post"] | order(_createdAt desc){
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
      const data = await client.fetch(query)
      setPosts(data)
    }

    fetchPosts()
  }, [])

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
            {/* Title */}
            <Link href={`/blog/${post.slug.current}`}>
              <h2 className="text-2xl font-bold text-black underline hover:text-gray-800 transition mb-3">
                {post.title}
              </h2>
            </Link>

            {/* Image */}
            {post.mainImage && (
              <Link href={`/blog/${post.slug.current}`}>
                <img
                  src={urlFor(post.mainImage).width(800).url()}
                  alt={post.title}
                  className="rounded-lg mb-4 w-full h-64 object-cover hover:opacity-90 transition"
                />
              </Link>
            )}

            {/* Snippet */}
            <p className="text-gray-700 mb-4">{snippet}</p>

            {/* Author + Reading Time */}
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

            {/* Read more */}
            <Link
              href={`/blog/${post.slug.current}`}
              className="text-blue-600 text-sm font-medium hover:underline"
            >
              Read more →
            </Link>
          </div>
        )
      })}
    </div>
  )
}
