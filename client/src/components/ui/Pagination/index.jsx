import './Pagination.css'
import ReactPaginate from 'react-paginate'
import useNavigation from '../../../hooks/useNavigation'

export default function Pagination ({ currentPage, totalPages }) {
  const { navigateTo } = useNavigation()

  const handlePageClick = (data) => {
    const selectedPage = data.selected + 1
    navigateTo({ newPage: selectedPage })
  }

  return (
    <ReactPaginate
      containerClassName={'pagination'}
      activeClassName={'active'}
      breakLabel='...'
      nextLabel='>'
      onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      pageCount={totalPages}
      previousLabel='<'
      renderOnZeroPageCount={null}
      initialPage={currentPage - 1}
    />
  )
}
