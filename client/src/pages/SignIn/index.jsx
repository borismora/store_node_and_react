import './SignIn.css'

export default function SignIn () {
  return (
    <div className='box'>
      <form action="">
        <h1>Iniciar Sesión</h1>
        <div className="form-group">
          <label htmlFor="">Email: </label>
          <input type="text" name="email" id="email" placeholder="Email" />
        </div>
        <div className="form-group">
          <label htmlFor="">Contraseña: </label>
          <input type="password" name="password" id="password" placeholder="Contraseña" />
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  )
}
