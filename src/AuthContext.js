import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const backendUrl = "https://pure-stream-14786.herokuapp.com";

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
    //   axios
    //     .get(`${backendUrl}/auth/me`, {
    //       headers: { Authorization: `Bearer ${token}` },
    //     })
    //     .then((response) => {
    //       console.log(response.data);
    //       setIsLoggedIn(true);
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //       setIsLoggedIn(false);
    //     });
        setIsLoggedIn(true);
    }
  }, []);

  const login = () => {
   
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
