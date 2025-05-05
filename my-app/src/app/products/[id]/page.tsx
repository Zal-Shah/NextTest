// src/app/products/[id]/page.tsx
import { notFound } from 'next/navigation'

interface Product {
  id: number
  title: string
  description: string
  price: number
  image: string
  category: string
  rating: { rate: number; count: number }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  // await the promise
  const { id } = await params
  // force SSR on every request
  const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
    cache: 'no-store',
  })

  if (!res.ok) {
    // render Next.js 404 page
    notFound()
  }

  const product: Product = await res.json()

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
