import { useNavigate, useSearchParams } from 'react-router-dom'

export default function useNavigation () {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  function navigateTo ({ newPage = '', newSearch = '' }) {
    const page = newPage ? newPage : currentPage()
    const search = newSearch ? newSearch : currentSearch()
    navigate(`?page=${page}&search=${search}`)
  }

  function currentPage () {
    return parseInt(searchParams.get('page')) || 1
  }

  function currentSearch () {
    return searchParams.get('search') || ''
  }

  return { navigateTo, currentPage, currentSearch }
}
