import './Filters.css'
import { useId, useState, useEffect } from 'react'
import useFilters from '../../../hooks/useFilters'
import useNavigation from '../../../hooks/useNavigation'
import Categories from '../../../services/categories'

export function Filters () {
  const [minPrice, setMinPrice] = useState(0)
  const [category, setCategory] = useState('all')
  const [categories, setCategories] = useState([])
  const { filters, setFilters } = useFilters()
  const { navigateTo } = useNavigation()

  const minPriceFilterId = useId()
  const categoryFilterId = useId()

  useEffect(() => {
    Categories().then(categories => {
      setCategories(categories)
    })
  }, [])

  function handleChangeMinPrice (event) {
    setMinPrice(event.target.value)
  }

  function handleChangeCategory (event) {
    setCategory(event.target.value)
  }

  function handleApplyFilters () {
    setFilters(prevState => ({
      ...prevState,
      minPrice: minPrice,
      category: category
    }))
    navigateTo({ newPage: 1, newSearch: filters.search })
  }

  return (
    <section className='filters'>
      <div>
        <label htmlFor={minPriceFilterId}>Precio a partir de: </label>
        <input type='range' id={minPriceFilterId} min={0} max={100000} onChange={handleChangeMinPrice} value={minPrice} />
        <span>${minPrice}</span>
      </div>

      <div>
        <label htmlFor={categoryFilterId}>Categoría</label>
        <select id={categoryFilterId} onChange={handleChangeCategory}>
          <option value='all'>Todas</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <button onClick={handleApplyFilters}>Aplicar</button>
      </div>
    </section>
  )
}
