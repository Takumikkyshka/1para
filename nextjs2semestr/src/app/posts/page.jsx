import Link from 'next/link'
import React from 'react'

export default async function PostPage() {

    const resp = await fetch('https://jsonplaceholder.org/posts')
    const data = await resp.json()

  return (
    <div>
      {
        data.map(post => (
          <Link href={`/posts/${post.id}`} key={post.id} className="mb-5 border-b border-b-red-500">
            <h3 className='mb-3 font-bold text-2xl'>{post.title}</h3>
            <p>{post.content}</p>
          </Link>
        ))
      }
    </div>
  )
}
