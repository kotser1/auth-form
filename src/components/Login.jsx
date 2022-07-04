import { useRef, useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import AuthContext from '../context/AuthProvider';

const LOGIN_URL = 'https://reqres.in/api/login';

function Login() {
  const { isAuth, setIsAuth, setAuthData } = useContext(AuthContext);
  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [email, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(LOGIN_URL, {
        email: email,
        password: pwd,
      });
      const accessToken = response?.data?.token;
      setAuthData({ email, pwd, accessToken });
      setIsAuth(true);
      localStorage.setItem('isAuth', true);
      localStorage.setItem('token', accessToken);
      localStorage.setItem('email', email);
      setEmail('');
      setPwd('');
    } catch (err) {
      if (!err?.response) {
        setErrMsg('Сервер недоступен');
      } else if (err.response?.status === 400) {
        setErrMsg(`Ошибка: ${err.response.data.error}`);
      } else if (err.response?.status === 401) {
        setErrMsg('Отказ в доступе');
      } else {
        setErrMsg('Ошибка авторизации!');
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {isAuth ? (
        <section>
          <h1>Вы авторизовались!</h1>
          <br />
          <p>
            <Link to='/'>На Главную</Link>
          </p>
        </section>
      ) : (
        <section>
          <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live='assertive'>
            {errMsg}
          </p>
          <h1>Войти</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor='username'>Email</label>
            <input
              type='email'
              id='username'
              ref={emailRef}
              autoComplete='off'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />

            <label htmlFor='password'>Пароль</label>
            <input type='password' id='password' onChange={(e) => setPwd(e.target.value)} value={pwd} required />
            <button disabled={!email || !pwd ? true : false}>Войти</button>
          </form>
          <p>
            Нужен аккаунт?
            <br />
            <span className='line'>
              <Link to={'/register'}>Зарегистрироваться</Link>
            </span>
          </p>
        </section>
      )}
    </>
  );
}
export default Login;
