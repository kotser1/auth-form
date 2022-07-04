import { useContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Register from './Register';
import Login from './Login';
import Home from './Home';

import AuthContext from './context/AuthProvider';

function App() {
  const {setIsAuth, setAuthData} = useContext(AuthContext);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsAuth(true);
      setAuthData({user: localStorage.getItem('email')})
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
