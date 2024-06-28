import './Navbar.css'
import { useCallback, useState } from 'react'
import { useAuth } from '../../../context/AuthContext'
import useNavigation from '../../../hooks/useNavigation'
import useFilters from '../../../hooks/useFilters'
import { Button, AButton } from '../../ui/Button'

export default function Navbar () {
  const { navigateTo } = useNavigation()
  const { setFilters } = useFilters()
  const { user, logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleSearch = useCallback((e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      setFilters((prevState) => ({
        ...prevState,
        search: e.target.value,
      }))
      navigateTo({ newSearch: e.target.value, newPage: 1 })
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
                title: 'Iniciar Sesión',
                href: '/login'
              }}
            />
          )}
          <Button
            params={{
              className: 'navbar-button',
              title: (
                <>
                  <svg xmlns='http://www.w3.org/2000/svg' className='cart-icon' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' />
                  </svg>
                  0
                </>
              )
            }}
          />
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
          <Button
            params={{
              className: 'navbar-button',
              title: (
                <>
                  <svg xmlns='http://www.w3.org/2000/svg' className='cart-icon' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' />
                  </svg>
                  0
                </>
              )
            }}
          />
        </div>
      )}
    </nav>
  )
}
