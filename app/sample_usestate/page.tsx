'use client'

export default function Page () {
  const showDialog: any = () => {
    alert("アラート")
  }

  return (
    <>
      <button onClick={ showDialog() }>Click</button>
    </>
  )
}