import React from 'react'

export default async function PostPage({params}) {

  const { id } = await params

  const resp = await fetch(`https://jsonplaceholder.org/posts/${id}`)
  const data = await resp.json()


  return (
    <div>
      <p>{data.title}</p>
    </div>
  )
}
