import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

import Main from '../layouts/Main'
import Home from '../pages/Home'
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import Profile from '../pages/Profile';

export default function RoutesModule () {
  return (
    <Router>
      <Main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Main>
    </Router>
  );
}
