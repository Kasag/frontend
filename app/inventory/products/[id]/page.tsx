'use client'

import { useState, useEffect } from 'react'
import productsData from '../sample/dummy_products.json'
import inventoriesData from '../sample/dummy_inventories.json'

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

/**
 * 商品在庫画面
 */

export default function Page() {
  // 検索条件：商品ID
  const params = {id: 1}
  
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

  return (
    <>
      <h2>商品在庫管理</h2>
      <h3>在庫処理</h3>
      <form>
        <div>
          <label>商品名：</label>
          <span>{product.name}</span>
        </div>
        <div>
          <label>数量：</label>
          <input type="text" />
        </div>
        <button>商品を仕入れる</button>
        <button>商品を卸す</button>
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