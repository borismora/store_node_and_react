import { useNavigate, useSearchParams } from 'react-router-dom'

export default function useNavigation () {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  function navigateTo ({ newRoute = '', newPage = '', newSearch = '' }) {
    const page = newPage ? newPage : currentPage()
    const search = newSearch
    navigate(`${newRoute}?page=${page}&search=${search}`)
  }

  function currentPage () {
    return parseInt(searchParams.get('page')) || 1
  }

  function currentSearch () {
    return searchParams.get('search') || ''
  }

  return { navigateTo, currentPage, currentSearch }
}
