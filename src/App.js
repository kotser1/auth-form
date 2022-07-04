import { useContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';

import AuthContext from './context/AuthProvider';

function App() {
  const {setIsAuth, setAuthData} = useContext(AuthContext);

  useEffect(() => {
    if (localStorage.getItem('isAuth') === 'true' && localStorage.getItem('token')) {
      setIsAuth(true);
      setAuthData({email: localStorage.getItem('email')})
    }
  }, [setIsAuth, setAuthData]);

  return (
    <main className='App'>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </main>
  );
}

export default App;
