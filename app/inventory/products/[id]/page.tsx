'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import productsData from '../sample/dummy_products.json'
import inventoriesData from '../sample/dummy_inventories.json'
import { Result } from 'postcss'

type ProductsData = {
  id: number | null
  name: string
  price: number
  description: string
}

type InventoryData = {
  id: number
  type: string
  date: string
  unit: number
  quantity: number
  price: number
  inventory: number
}

type FormData = {
  id: number
  quantity: number
}

/**
 * 商品在庫画面
 */

export default function Page() {
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors}
  } = useForm()

  // 検索条件：商品ID
  const [id, setId] = useState<number | null>(0)
  const params = {id: 1}

  // submit時のアクションを分岐させる。
  const [action, setAction] = useState<string>()
  const [severity, setSeverity] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const result = (severity: string, message: string) => {
    setSeverity(severity)
    setMessage(message)
  }
  
  // 読み込みデータを保持する。
  const [product, setProduct] = useState<ProductsData>({
    id: 0,
    name: "",
    price: 0,
    description: ""
  })
  const [inventoryData, setInventoryData] = useState<Array<InventoryData>>([])

  useEffect(() => {
    const selectedProduct: ProductsData = productsData.find(value => value.id == params.id) ?? {
      id: 0,
      name: "",
      price: 0,
      description: ""
    }
    setProduct(selectedProduct)
    setInventoryData(inventoriesData)
  }, [])

  const onSubmit = (event: any): void => {
    const data: FormData = {
      id: Number(params.id),
      quantity:Number(event.quantity),
    }

    if ( action === "sell" ) {
      if(data.id === null){
        return
      }
      handleSell(data)
    } else if (action === "purchase") {
      handlePurchase(data)
    }
  }

  // 卸し処理
  const handleSell = (data: FormData) => {
    result('success', '商品を卸しました。')
  }

  // 仕入れ処理
  const handlePurchase =(data: FormData) => {
    result('success', '商品を仕入れました。')
  }

  return (
    <>
      <h2>商品在庫管理</h2>
      <h3>在庫処理</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>商品名：</label>
          <span>{product.name}</span>
        </div>
        <div>
          <label>数量：</label>
          <input type="text" id="quantity" {...register("quantity", {required: true, min: 1, max: 99999999})}/>
          {errors.quantity && (
            <div>1から99999999の数値を入力してください</div>
          )}
        </div>
        <button onClick={ () => setAction("purchase") }>商品を仕入れる</button>
        <button onClick={ () => setAction("sell") }>商品を卸す</button>
      </form>
      <h3>在庫履歴</h3>
      <table>
        <thead>
          <tr>
            <th>処理種別</th>
            <th>処理日時</th>
            <th>単価</th>
            <th>数量</th>
            <th>価格</th>
            <th>在庫数</th>
          </tr>
        </thead>
        <tbody>
          {inventoriesData.map((inventory: InventoryData) => (
            <tr>
              <td>{inventory.type}</td>
              <td>{inventory.date}</td>
              <td>{inventory.unit}</td>
              <td>{inventory.quantity}</td>
              <td>{inventory.price}</td>
              <td>{inventory.inventory}</td>
            </tr>
            ))}
        </tbody>
      </table>
    </>
  )
}