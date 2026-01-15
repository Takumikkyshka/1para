import React from 'react'

export default async function page({params}) {
    
    const { id } = await params

    const resp = await fetch(`https://dummyjson.com/products/${id}`)
    const data = await resp.json()

  return (
    <div>
      
        <h3>{data.title}</h3>
        <p>Описание товара: {data.description}</p>
        <span>{data.price}$</span>

    </div>
  )
}
