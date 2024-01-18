'use client'

import{ useState, useEffect } from 'react'
import Link from 'next/link'
import productsData from './sample/dummy_products.json'

type ProductsData = {
  id: number,
  name: string,
  price: number,
  description: string
}

export default function Page () {
  const [products, setProducts] = useState<Array<ProductsData>>([])
  useEffect(() => {
    setProducts(productsData)
  }, [])

  return (
    <>
      <h2>商品一覧</h2>
      <button>商品を追加する</button>
      <table>
        <thead>
          <tr>
            <th>商品ID</th>
            <th>商品名</th>
            <th>単価</th>
            <th>説明</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product: ProductsData) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.description}</td>
              <td><Link href={'/inventory/products/${product.id}'}>在庫管理</Link></td>
              <td><button>更新・削除</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}