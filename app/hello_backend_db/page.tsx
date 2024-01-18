'use client'

import axios from "axios"
import { useState, useEffect } from "react"

export default function Page() {
  const [data, setData] = useState({message: '初期表示'})

  useEffect(() => {
    axios.get('api/hello_db/backend')
    .then((res) => res.data)
    .then((data) => {
      setData(data)
    })
  }, [])
  return <div>hello {data.message}!</div>
}