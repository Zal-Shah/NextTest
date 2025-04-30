// src/app/products/[id]/page.tsx
'use client'

import useSWR from 'swr'

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error('Failed to fetch')
    return res.json()
  })

export default function ProductPage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params
  const { data: product, error } = useSWR(
    id ? `https://fakestoreapi.com/products/${id}` : null,
    fetcher
  )

  if (!product && !error) return <p>Loading…</p>
  if (error) return <p style={{ color: 'red' }}>Error: {(error as Error).message}</p>

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
