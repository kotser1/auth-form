import { createContext, useState } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
  const [authData, setAuthData] = useState({});
  const [isAuth, setIsAuth] = useState(false);

  return (
    <AuthContext.Provider value={{authData, setAuthData, isAuth, setIsAuth}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;
