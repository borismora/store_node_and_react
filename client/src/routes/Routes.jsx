import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

import Main from '../layouts/Main'
import Home from '../pages/Home'
import SignIn from '../pages/SignIn';

export default function RoutesModule () {
  return (
    <Router>
      <Main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signin' element={<SignIn />} />
          {/* Aquí puedes agregar más rutas para otras páginas */}
        </Routes>
      </Main>
    </Router>
  );
}
