'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import productsData from './sample/dummy_products.json'

type ProductsData = {
  id: number | null
  name: string
  price: number
  description: string
}

type InputData = {
  id: string
  name: string
  price: string
  description: string
}

/**
 * 商品一覧ページ
 */

export default function Page () {
  // 読み込みデータを保持する。
  const [products, setProducts] = useState<Array<ProductsData>>([])
  useEffect(() => {
    setProducts(productsData)
  }, [])

  // 登録データを保持する。
  const [input, setInput] = useState<InputData>({
    id: "",
    name: "",
    price: "",
    description: ""
  })

  // 登録データの値を更新する。
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target
    setInput({
      ...input,
      [name]: value
    })
  }

  //　新規登録処理、新規登録行の表示状態を管理する。
  const [shownNewRow, setShownNewRow] = useState<boolean>(false)
  const handleShowNewRow = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    setShownNewRow(true)
  }
  const handleAddCancel = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    setShownNewRow(false)
  }
  const handleAdd = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    // TODO 登録処理を呼ぶ
    setShownNewRow(false)
  }

  //　更新・削除処理。更新・削除行の表示状態を管理する。
  const [editingRow, setEditingRow] = useState<number>(0)
  const handleEditRow: any = (id: number) => {
    setShownNewRow(false)
    setEditingRow(id)

    const selectedProduct: ProductsData = products.find((value) => value.id === id) as ProductsData
    setInput({
      id: id.toString(),
      name: selectedProduct.name,
      price: selectedProduct.price.toString(),
      description: selectedProduct.description,
    })
  }

  const handleEditCancel: any = (id: number) => {
    setEditingRow(0)
  }
  
  const handleDelete: any = (id: number) => {
    setEditingRow(0)
  }

  return (
    <>
      <h2>商品一覧</h2>
      <button onClick={ handleShowNewRow }>商品を追加する</button>
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
          {shownNewRow ? (
            <tr>
              <td></td>
              <td><input type='text' name='name' onChange={ handleInput } /></td>
              <td><input type='number' name='price' onChange={ handleInput } /></td>
              <td><input type='text' name='description' onChange={ handleInput } /></td>
              <td></td>
              <td>
                <button onClick={ handleAdd }>登録する</button>
                <button onClick={ handleAddCancel }>キャンセル</button>
              </td>
            </tr>
          ) : ""}
          {products.map((product: ProductsData) => (
            editingRow === product.id ? (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td><input type='text' value={input.name} /></td>
              <td><input type='number' value={input.price} /></td>
              <td><input type='text' value={input.description} /></td>
              <td></td>
              <td>
                <button onClick={  () => handleEditRow(product.id) }>更新する</button>
                <button onClick={  () => handleEditCancel(product.id) }>キャンセルする</button>
              </td>
              <td><button onClick={  () => handleDelete(product.id) }>削除する</button></td>
            </tr>
            ) 
            : (
              <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.description}</td>
              <td><Link href={'/inventory/products/${product.id}'}>在庫管理</Link></td>
              <td><button onClick={ () => handleEditRow(product.id) }>更新・削除</button></td>
            </tr>
            )
          ))}
        </tbody>
      </table>
    </>
  )
}