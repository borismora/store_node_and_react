import './Navbar.css'
import { useCallback, useState } from 'react'
import { useAuth } from '../../../context/AuthContext'
import useNavigation from '../../../hooks/useNavigation'
import useFilters from '../../../hooks/useFilters'
import { AButton } from '../../ui/Button'
import { Cart } from '../../common/Cart'
import { UserIcon } from '../../ui/Icons'

export default function Navbar () {
  const { navigateTo } = useNavigation()
  const { setFilters } = useFilters()
  const { user, logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleSearch = useCallback((e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const searchValue = e.target.value.trim()

      setFilters((prevState) => ({
        ...prevState,
        search: searchValue,
      }))
      navigateTo({ newRoute: '/', newSearch: searchValue || '', newPage: 1 })
    }
  }, [navigateTo, setFilters])

  return (
    <nav className='navbar'>
      <div className='navbar-container'>
        <div className='navbar-left'>
          <a href='/' className='navbar-title'>Store Test</a>
        </div>
        <div className='navbar-right'>
          <input type='text' placeholder='Buscar productos...' className='search-input' onKeyUp={handleSearch} />
          {user ? (
            <>
              <AButton
                params={{
                  className: 'navbar-button',
                  title: 'Mi Perfil',
                  href: '/profile'
                }}
              />
              <AButton
                params={{
                  className: 'navbar-button',
                  title: 'Cerrar Sesión',
                  onClick: logout
                }}
              />
            </>
          ) : (
            <AButton
              params={{
                className: 'navbar-button',
                title: (
                  <>
                    <UserIcon />Login
                  </>
                ),
                href: '/login'
              }}
            />
          )}
          <Cart />
        </div>
        <div className='navbar-toggle' onClick={() => setMenuOpen(!menuOpen)}>
          <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
        </div>
      </div>
      {menuOpen && (
        <div className='navbar-mobile'>
          <input type='text' placeholder='Buscar productos...' className='search-input' onKeyUp={handleSearch} />
          {user ? (
            <>
              <AButton
                params={{
                  className: 'navbar-button',
                  title: 'Mi Perfil',
                  href: '/profile'
                }}
              />
              <AButton
                params={{
                  className: 'navbar-button',
                  title: 'Cerrar Sesión',
                  onClick: logout
                }}
              />
            </>
          ) : (
            <AButton
              params={{
                className: 'navbar-button',
                title: 'Iniciar Sesión',
                href: '/login'
              }}
            />
          )}
          <Cart />
        </div>
      )}
    </nav>
  )
}
