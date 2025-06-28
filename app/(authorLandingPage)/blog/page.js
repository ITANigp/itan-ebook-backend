// app/(authorLandingPage)/blog/page.jsx

import BlogClient from './BlogClient'
import { client } from '@/lib/sanity'

export const revalidate = 60

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

  return <BlogClient posts={posts} />
}
