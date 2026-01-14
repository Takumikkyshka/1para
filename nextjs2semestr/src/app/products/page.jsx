import Link from 'next/link'
import React from 'react'

export default function ProductsPage() {
  return (
    <div>
      Каталог товаров
      <Link href="products/1">Товар 1</Link>
      <Link href="products/51221">Товар 51221</Link>
    </div>
  )
}
