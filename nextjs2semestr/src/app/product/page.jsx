'use client'

import React, { useEffect, useState } from 'react'
import ProductAdminCard from '../components/ProductAdminCard'

export default function ProductSecondPage() {

    const [products, setProducts] = useState([])
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')

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
                title: title,
                price: price
            }
        )}))
        const data = await resp.json()
        console.log(data)
        if(data.status === 'success'){
            setTitle('')
            setPrice('')


            setProducts(
                [
                    ...products,
                    {
                        title: data.message.title,
                        price: data.message.price,
                        id: data.message.id,
                    }
                ]
            )
        }

    }


  return (
    <div>
        <h1>Наши продукты</h1>
        <div className='flex justify-start gap-15 flex-wrap'>

            {
                products.map(product => (
                    <ProductAdminCard product={product} setProducts={setProducts} key={product.id}/>
                ) )
            }

        </div>
        <h2 className='py-5'>Создать товар</h2>
        <form className='flex flex-col' onSubmit={(e) => createProduct(e)}>
            <input className='w-[400px] py-1 mb-5 px-2' value={title} onInput={(e) => setTitle(e.target.value)} type="text" placeholder='Введите название товара'></input>
            <input className='w-[400px] py-1 px-2' value={price} onInput={(e) => setPrice(e.target.value)} type="text" placeholder='Введите цену товара'></input>
            <button className='flex justify-start cursor-pointer border rounded-2xl w-[100px] px-5 mt-5 py-1'>Создать</button>
        </form>
    </div>
  )
}
