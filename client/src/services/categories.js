export default async function Categories () {
  try {
    const res = await fetch(
      'http://localhost:8000/categories'
    )
    const data = await res.json()

    return data
  } catch (error) {
    throw new Error('Error fetching categories')
  }
}
