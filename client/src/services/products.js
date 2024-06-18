export default async function fetchProducts ({ filters }) {
  try {
    console.log(`${import.meta.env.VITE_API_URL}/products${filters}`)
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/products${filters}`
    )
    const data = await res.json()

    return data
  } catch (error) {
    throw new Error('Error fetching products')
  }
}
