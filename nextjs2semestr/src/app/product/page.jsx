'use client'

import React, { useEffect, useState } from 'react'

export default function ProductSecondPage() {

    const [products, setProducts] = useState([])
    const [title, setTitle] = useState('')

    useEffect(() => {
        async function getProducts(){
            const resp = await fetch('/api/products')
            const data = await resp.json()
            setProducts(data)
        }
        getProducts()

    }, [])

    async function createProduct(e){
        e.preventDefault()

        const resp = await fetch('/api/products',({
            method: 'post',
            body: JSON.stringify({
                title: title
            }
        )}))
        const data = await resp.json()
        console.log(data)
        if(data.status === 'success'){
            setTitle('')
        }

    }

  return (
    <div>
        <h1>Наши продукты</h1>
        {
            products.map(product => (
                <div key={product.id}>
                    <span>Id: {product.id}</span>
                    <h3>{product.title}</h3>
                </div>
            ) )
        }
        <h2>Создать товар</h2>
        <form className='flex flex-col' onSubmit={(e) => createProduct(e)}>
            <input value={title} onInput={(e) => setTitle(e.target.value)} type="text" placeholder='Введите название товара'></input>
            <button className='flex justify-start'>Создать</button>
        </form>
    </div>
  )
}
