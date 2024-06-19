import './NotFound.css';
import { Link } from 'react-router-dom';

export default function NotFound () {
  return (
    <div className="not-found-container">
      <h1 className="error-code">404</h1>
      <p className="error-message">Lo sentimos, la página que buscas no existe.</p>
      <Link to="/" className="home-button">Volver al Inicio</Link>
    </div>
  );
}