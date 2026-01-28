'use client'
import React, { useState } from 'react'

export default function ProductAdminCard({product, setProducts}) {

    const [title, setTitle] = useState(product.title)
    const [price, setPrice] = useState(product.price)
    const [isEditing, setIsEditing] = useState(false)

    async function deleteProduct(id){

        const resp = await fetch('/api/products', {
            method: 'delete',
            body: JSON.stringify({
                id: id
            })
        })
        const result = await resp.json()

        if(resp.ok){
            // setProducts(
            //     products.filter(product => product.id !== result.id)
            // )
            setProducts(prev => prev.filter(prodcut => product.id !== result.id))
        }

    }

    async function editProduct(){
        const resp = await fetch('/api/products', {
            method: 'put',
            body: JSON.stringify({
                id: product.id,
                price: price,
                title: title
            })
        })
        const result = await resp.json()

        if(resp.ok){
            setIsEditing(false)
        }
    }
    
  return (
        <div className='w-80 py-5 border rounded-2xl mt-5'>
            <span className='px-5'>Id: {product.id}</span>
            <div>
            {
                isEditing ? <input value={title} onInput={(e) => setTitle(e.target.value)} type='text' className='my-2 px-1 py-0.5 mx-2' /> : <h3 className='px-5'>{title}</h3>
            }
            {
                isEditing ? <input value={price} onInput={(e) => setPrice(e.target.value)} type='text' className='my-2 px-1 py-0.5 mx-2' /> : <p className='px-5'>{price}</p>
            }
            </div>
            <div className='flex justify-around'>
                <button onClick={() => deleteProduct(product.id)} className='mx-4 px-5 py-2 my-2 border rounded-2xl cursor-pointer bg-red-600 text-white '>Удалить</button>
                {
                    isEditing ? <button onClick={() => editProduct()} className='mx-4 px-5 py-2 my-2 border rounded-2xl cursor-pointer bg-green-500 text-white'>Cохранить</button> : <button onClick={() => setIsEditing(true)} className='mx-4 px-5 py-2 my-2 border rounded-2xl cursor-pointer bg-amber-500 text-white'>Изменить</button>
                }
            </div>
        </div>
  )
}
