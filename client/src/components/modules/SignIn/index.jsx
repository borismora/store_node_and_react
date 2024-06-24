import '../../../pages/Login/Login.css'
import Spinner from '../../ui/Spinner'
import { useState } from 'react'
import { signIn } from '../../../services/login'
import { useAuth } from '../../../context/AuthContext'

export default function SignIn () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()

  const handleChangeEmail = (e) => {
    setEmail(e.target.value)
  }

  const handleChangePassword = (e) => {
    setPassword(e.target.value)
  }

  const getAndSaveUser = async () => {
    const response = await signIn({ email, password })
    login(response, setIsLoading)
  }

  const signInUser = async () => {
    setIsLoading(true)
    getAndSaveUser()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      signInUser()
    } catch (error) {
      setError(error.message)
      setIsLoading(false)
    }
  }

  return (
    <div className='box'>
      {
        isLoading
          ? <Spinner />
          : null
      }
      <form action="">
        <h1>Iniciar Sesión</h1>
        <div className="form-group">
          <label htmlFor="">Email: </label>
          <input type="text" name="email" id="email" placeholder="Email" value={email} onChange={handleChangeEmail} />
        </div>
        <div className="form-group">
          <label htmlFor="">Contraseña: </label>
          <input type="password" name="password" id="password" placeholder="Contraseña" value={password} onChange={handleChangePassword} />
        </div>
        <button type="submit" onClick={handleSubmit}>Iniciar Sesión</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  )
}
