export default async function fetchProducts ({ filters }) {
  try {
    console.log(`http://localhost:8000/products${filters}`)
    const res = await fetch(
      `http://localhost:8000/products${filters}`
    )
    const data = await res.json()

    return data
  } catch (error) {
    throw new Error('Error fetching products')
  }
}
