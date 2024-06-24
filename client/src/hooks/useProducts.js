import { useState, useCallback, useRef } from 'react'
import fetchProducts from '../services/products'
import useFilters from '../hooks/useFilters'

export default function useProducts () {
  const page = useRef({ currentPage: 1, totalPages: 0 })
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const { getFilters } = useFilters()

  const getProducts = useCallback(async () => {
    try {
      setError(null)
      setIsLoading(true)
      const data = await fetchProducts({ filters: getFilters() })
      setProducts(data?.products)
      page.current = data?.page
    } catch (error) {
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }, [getFilters])

  return {
    products,
    isLoading,
    error,
    page: page.current,
    setPage: (newPage) => { page.current = newPage },
    getProducts
  }
}
