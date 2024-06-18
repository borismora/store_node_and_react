import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

import Main from '../layouts/Main'
import Home from '../pages/Home'

export default function RoutesModule () {
  return (
    <Router>
      <Main>
        <Routes>
          <Route path='/' element={<Home />} />
          {/* Aquí puedes agregar más rutas para otras páginas */}
        </Routes>
      </Main>
    </Router>
  );
}
