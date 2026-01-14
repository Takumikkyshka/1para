import React from 'react'

export default async function ProductPage({params}) {

  const { id } = await params

  return (
    <div>
      Карточка товара по id
      ID товара: {id}
    </div>
  )
}
