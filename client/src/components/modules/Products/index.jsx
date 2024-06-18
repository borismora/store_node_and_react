import './Products.css'
import Product from '../../ui/Product'
import Pagination from '../../ui/Pagination'
import Spinner from '../../ui/Spinner'
import { Filters } from '../../ui/Filters/index.jsx'

import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import useProducts from '../../../hooks/useProducts.js'
import useFilters from '../../../hooks/useFilters.js'

export default function Products () {
  const { products, isLoading, error, page, setPage, getProducts } = useProducts()
  const [searchParams] = useSearchParams()
  const { filters } = useFilters()

  useEffect(() => {
    const currentPage = parseInt(searchParams.get('page')) || 1
    if (page.currentPage !== currentPage) {
      setPage({ ...page, currentPage })
    }
    getProducts(currentPage, filters)
  }, [searchParams, filters])

  return (
    <>
      <Filters />
      {
        isLoading
          ? <Spinner />
          : <div>
            <div className='products'>
              <ul>
                {
                  products?.map(product => (
                    <Product {...product} key={`product-${product?.id}`} />
                  ))
                }
              </ul>
            </div>
            <Pagination
              currentPage={page.currentPage}
              totalPages={page.totalPages}
            />
          </div>
      }
      {error && <p>{error.message}</p>}
    </>
  )
}
