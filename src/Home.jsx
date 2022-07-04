import { useContext } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from './context/AuthProvider';

function Home() {
  const {authData, setAuthData, isAuth, setIsAuth} = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.clear();
    setIsAuth(false);
    setAuthData({});
  }

  return isAuth ? (
    <div>
      <h1>Привет, {authData.user} !</h1>
      <h2>Добро пожаловать на главную страницу!</h2>
      <p>Тут отображается контент для авторизованных пользователей:</p>
      <p>... ... ...</p>
      <button onClick={handleLogout}>Выйти</button>
    </div>
  ) : (
    <div>
    <h1>Привет, гость!</h1>
    <p>Войдите в свою учетную запись, чтобы просматривать контент сайта.</p>
    <Link to={'/login'}>Войти</Link>
  </div>
  )
}
export default Home;
