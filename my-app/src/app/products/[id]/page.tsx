// src/app/products/[id]/page.tsx
'use client'

import { useState, useEffect } from 'react'

interface Product {
  id: number
  title: string
  description: string
  price: number
  image: string
  category: string
  rating: { rate: number; count: number }
}

export default function ProductPage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch')
        return res.json()
      })
      .then((data: Product) => {
        setProduct(data)
        setLoading(false)
      })
      .catch((err) => {
        setError((err as Error).message)
        setLoading(false)
      })
  }, [id])

  if (loading) return <p>Loading…</p>
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>
  if (!product) return <p>No product found.</p>

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', textAlign: 'center' }}>
      <h1>{product.title}</h1>
      <img src={product.image} alt={product.title} width={300} />
      <p>{product.description}</p>
      <p>
        <strong>Price:</strong> ${product.price}
      </p>
      <p>
        <em>Category:</em> {product.category}
      </p>
      <p>
        ⭐ {product.rating.rate} ({product.rating.count} reviews)
      </p>
    </div>
  )
}
