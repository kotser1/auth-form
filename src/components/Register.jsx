import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = 'https://reqres.in/api/register';

function Register() {
  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg('');
  }, [email, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(REGISTER_URL, {
        email: email,
        password: pwd,
      });
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg('Сервер не отвечает');
      } else if (err.response?.status === 409) {
        setErrMsg('Логин занят');
      } else {
        setErrMsg(`Ошибка регистрации: ${err.response.data.error}`);
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Регистрация выполнена успешно!</h1>
          <p>
            <Link to='/login'>Войти</Link>
          </p>
        </section>
      ) : (
        <section>
          <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live='assertive'>
            {errMsg}
          </p>
          <h1>Регистрация</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor='user-email'>
              Email:
              <span className={validEmail ? 'valid' : 'hide'}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validEmail || !email ? 'hide' : 'invalid'}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type='email'
              id='user-email'
              ref={emailRef}
              autoComplete='off'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-invalid={validEmail ? 'false' : 'true'}
              aria-describedby='uidnote'
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
            />
            <p id='uidnote' className={emailFocus && email && !validEmail ? 'instructions' : 'offscreen'}>
              <FontAwesomeIcon icon={faInfoCircle} />
              От 4 до 24 символов.
              <br />
              Email должен начинаться с буквы.
              <br />
              Буквы, цифры, знаки подчеркивания, дефисы разрешены.
            </p>

            <label htmlFor='password'>
              Пароль:
              <span className={validPwd ? 'valid' : 'hide'}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validPwd || !pwd ? 'hide' : 'invalid'}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type='password'
              id='password'
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              required
              aria-invalid={validPwd ? 'false' : 'true'}
              aria-describedby='pwdnote'
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            <p id='pwdnote' className={pwdFocus && !validPwd ? 'instructions' : 'offscreen'}>
              <FontAwesomeIcon icon={faInfoCircle} />
              От 8 до 24 символов.
              <br />
              Пароль должен содержать заглавные и прописные буквы, хотя бы одно число и спецсимвол.
              <br />
              Разрешенные спецсимволы: <span aria-label='exclamation mark'>!</span>
              <span aria-label='at symbol'>@</span> <span aria-label='hashtag'>#</span>{' '}
              <span aria-label='dollar sign'>$</span> <span aria-label='percent'>%</span>
            </p>

            <label htmlFor='confirm_pwd'>
              Повторите пароль:
              <span className={validMatch && matchPwd ? 'valid' : 'hide'}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validMatch || !matchPwd ? 'hide' : 'invalid'}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type='password'
              id='confirm_pwd'
              value={matchPwd}
              onChange={(e) => setMatchPwd(e.target.value)}
              required
              aria-invalid={validMatch ? 'false' : 'true'}
              aria-describedby='confirmnote'
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />
            <p id='confirm_pwd' className={matchFocus && !validMatch ? 'instructions' : 'offscreen'}>
              <FontAwesomeIcon icon={faInfoCircle} />
              Пароли должны совпадать
            </p>

            <button disabled={!validEmail || !validPwd || !validMatch ? true : false}>Зарегистрироваться</button>
          </form>
          <p>
            Уже зарегистрированы?
            <br />
            <span className='line'>
              <Link to={'/login'}>Войти</Link>
            </span>
          </p>
        </section>
      )}
    </>
  );
}

export default Register;
