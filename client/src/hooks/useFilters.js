import { useContext } from 'react'
import { FiltersContext } from '../context/FiltersContext'
import { useSearchParams } from 'react-router-dom'

export default function useFilters () {
  const { filters, setFilters } = useContext(FiltersContext)
  const [searchParams] = useSearchParams()

  function getFilters () {
    return `?page=${currentPage()}&minPrice=${filters.minPrice}&category=${filters.category}&search=${currentSearch()}`
  }

  function currentPage () {
    return parseInt(searchParams.get('page')) || 1
  }

  function currentSearch () {
    return searchParams.get('search') || ''
  }

  return { filters, getFilters, setFilters }
}
