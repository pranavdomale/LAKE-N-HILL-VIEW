import React, { createContext, useState, useContext } from "react";

// Create a Context for authentication
const AuthContext = createContext();

// Custom hook to use AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = () => {
    setUser(user);
  };

  const logout = () => {
    setUser(null); // Clear user data on logout
  };

  return (
    <AuthContext.Provider value={{ user, setUser ,login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
