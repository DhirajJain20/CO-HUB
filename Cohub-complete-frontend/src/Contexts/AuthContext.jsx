import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

//   useEffect(() => {
//     // Check if user is already logged in (e.g., by checking browser storage)
//     const idToken = sessionStorage.getItem('idToken');
//     if (idToken) {
//       setLoggedIn(true);
//     }
//   }, []);

  const login = () => {
    setLoggedIn(true);
  };

  const logout = () => {
    setLoggedIn(false);
    sessionStorage.removeItem('idToken');
  };

  return (
    <AuthContext.Provider value={{ loggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
