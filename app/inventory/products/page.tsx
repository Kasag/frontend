'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import productsData from './sample/dummy_products.json'

type ProductsData = {
  id: number | null
  name: string
  price: number
  description: string
}

/**
 * 商品一覧ページ
 */

export default function Page () {
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors}
  } = useForm()

  // 読み込みデータを保持する。
  const [products, setProducts] = useState<Array<ProductsData>>([])
  useEffect(() => {
    setProducts(productsData)
  }, [])

  // ID
  const [id, setId] = useState<number | null>(0)
  const [action, setAction] = useState<string>("")

  const onSubmit = (event: any): void => {
    const data: ProductsData = {
      id: id,
      name: event.name,
      price: Number(event.price),
      description: event.description,
    }

    // actionによってHTTPメソッドと使用するパラメーターを切り替える。
    if( action === "add" ){
      handleAdd(data)
    } else if ( action === "update" ) {
      if ( data.id === null ){
        return
      }
      handleEdit(data)
    } else if ( action === "delete" ) {
      if ( data.id === null ) {
        return
      }
      handleDelete(data.id)
    }
  }

  //　新規登録処理、新規登録行の表示状態を管理する。
  const [shownNewRow, setShownNewRow] = useState<boolean>(false)
  const handleShowNewRow = () => {
    setId(null)
    reset({
      name: "",
      price: 0,
      description: ""
    })
  }
  const handleAddCancel = () => {
    setId(0)
  }

  const handleAdd = (data: ProductsData) => {
    setId(0)
  }

  //　更新・削除処理。更新・削除行の表示状態を管理する。
  const handleEditRow: any = (id: number | null) => {
    const selectedProduct: ProductsData = products.find((value) => value.id === id) as ProductsData
    
    setId(selectedProduct.id)
    reset({
      name: selectedProduct.name,
      price: selectedProduct.price,
      description: selectedProduct.description,
    })
  }

  const handleEditCancel: any = () => {
    setId(0)
  }

  const handleEdit: any = (data: ProductsData) => {
    setId(data.id)
  }
  
  const handleDelete: any = (id: number) => {
    setId(0)
  }

  return (
    <>
      <h2>商品一覧</h2>
      <button type='button' onClick={ handleShowNewRow }>商品を追加する</button>
      <form onSubmit={handleSubmit(onSubmit)}>
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
            {id === null ? (
              <tr>
                <td></td>
                <td><input type='text' id='name' {...register("name", {required: true, maxLength: 100})} /></td>
                {errors.name && (
                  <div>100文字以内の商品名を入力してください</div>
                )}
                <td><input type='number' id='price' {...register("price", {required: true, min: 1, max: 99999999})} /></td>
                {errors.price && (
                 <div>1から99999999の数値を入力してください</div> 
                )}
                <td><input type='text' id='description' {...register("description")} /></td>
                <td></td>
                <td>
                  <button type='button' onClick={ () => setAction("add") }>登録する</button>
                  <button type='button' onClick={ () => handleAddCancel() }>キャンセル</button>
                </td>
              </tr>
            ) : ""}
            {products.map((product: ProductsData) => (
              id === product.id ? (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td><input type='text' id='name' {...register("name", {required: true, maxLength: 100})} /></td>
                {errors.name && (
                  <div>100文字以内の商品名を入力してください</div>
                )}
                <td><input type='number' id='price' {...register("price", {required: true, min: 1, max: 99999999})} /></td>
                {errors.price && (
                  <div>1から99999999の数値を入力してください</div>
                )}
                <td><input type='text' id='description' {...register("description")} /></td>
                <td></td>
                <td>
                  <button onClick={  () => setAction("update") }>更新する</button>
                  <button onClick={  () => handleEditCancel() }>キャンセルする</button>
                </td>
                <td><button onClick={  () => handleDelete("delete") }>削除する</button></td>
              </tr>
              ) 
              : (
                <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.description}</td>
                <td><Link href={`/inventory/products/${product.id}`}>在庫管理</Link></td>
                <td><button onClick={ () => handleEditRow(product.id) }>更新・削除</button></td>
              </tr>
              )
            ))}
          </tbody>
      </table>
      <input type="text" id="name" 
			  {...register("name_test", 
				  {
					  required: true, 
					  maxLength: {
					   value: 100,
					   message: "名前は100文字以内で入力してください。"
					  }
				  }
			  )} />
      </form>
    </>
  )
}