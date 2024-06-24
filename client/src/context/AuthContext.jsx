import { createContext, useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import localStorageHelper from '../utils/localStorageHelper'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [currentUser, setcurrentUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const storedUser = localStorageHelper.getItemWithExpiration('user')
    if (storedUser) {
      setcurrentUser(storedUser)
    }
  }, [])

  const login = (userData, setIsLoading) => {
    const expirationDate = new Date(userData.user.createdAt)
    expirationDate.setDate(expirationDate.getDate() + 30) // Expira en 30 días
    localStorageHelper.setItemWithExpiration('user', userData, expirationDate)
    setcurrentUser(userData)
    setIsLoading(false)
    navigate('/')
  }

  const logout = () => {
    localStorageHelper.removeItem('user')
    setcurrentUser(null)
    navigate('/')
  }

  return (
    <AuthContext.Provider value={{ user: currentUser?.user, token: currentUser?.token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
