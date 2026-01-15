import Link from 'next/link'
import React from 'react'

export default async function ProductsPage() {

    const resp = await fetch('https://dummyjson.com/products')
    const data = await resp.json()

  return (
    <div>
        {
            data.products.map(product => (
                <div key={product.id}className="mb-5 pb-2 border-b border-b-red-500">
                    <Link href={`/products/${product.id}`}>
                        <h3 className='mb-3 font-bold text-2xl'>{product.title}</h3>
                        <p>Описание товара:{product.description}</p>
                        <span>{product.price}$</span>
                    </Link>
                </div>
            ))
        }
    </div>
  )
}
