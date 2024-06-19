import '../../../pages/Login/Login.css'

export default function SignUp () {
  return (
    <div className='box'>
      <form action="">
        <h1>Registrarse</h1>
        <div className="form-group">
          <label htmlFor="name">Nombre: </label>
          <input type="text" name="name" id="name" placeholder="Nombre" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email: </label>
          <input type="text" name="email" id="email" placeholder="Email" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña: </label>
          <input type="password" name="password" id="password" placeholder="Contraseña" />
        </div>
        <div className="form-group">
          <label htmlFor="confirm-password">Confirmar Contraseña: </label>
          <input type="password" name="confirm-password" id="confirm-password" placeholder="Confirmar Contraseña" />
        </div>
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
}