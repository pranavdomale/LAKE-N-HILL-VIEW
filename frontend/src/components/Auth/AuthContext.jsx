// import React, { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";

// // Create AuthContext
// const AuthContext = createContext();

// // Custom hook to use the AuthContext
// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [checkLogin, setCheckLogin] = useState(false);
//   const [loading, setLoading] = useState(true);

//   // Function to fetch the logged-in user (e.g., on page load or refresh)
//   const fetchUser = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/checkLogin", {
//         withCredentials: true,
//       });

//       if (response.data.ok) {
//         setUser(response.data.user);
//         setCheckLogin(true);
//       } else {
//         setUser(null);
//         setCheckLogin(false);
//       }
//     } catch (error) {
//       console.error("Error fetching user:", error);
//       setUser(null);
//       setCheckLogin(false);
//     }
//   };

//   const checkSession = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get("http://localhost:5000/check-session", { withCredentials: true });
//       if (response.data.loggedIn) {
//         setCheckLogin(true);
//         setUser(response.data.user);  // assuming response.data.user has username, etc.
//       } else {
//         setCheckLogin(false);
//         setUser(null);
//       }
//     } catch (error) {
//       console.error("Session check failed", error);
//       setCheckLogin(false);
//       setUser(null);
//     }
//   };

//   // Run on initial load to check if user is already logged in
//   useEffect(() => {
//     fetchUser();
//     checkSession();
//   }, []);

//   // Manual login (you can modify this if login needs an API call)
//   const login = (userData) => {
//     setUser(userData);
//     setCheckLogin(true);
//   };

//   // Logout function - clears user data
//   const logout = () => {
//     setUser(null);
//     setCheckLogin(false);
//     // You can also add API call here to destroy session if needed
//   };

//   return (
//     <AuthContext.Provider
//       value={{ user, setUser, checkLogin, setCheckLogin, fetchUser, login, logout,  }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// Create AuthContext
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [checkLogin, setCheckLogin] = useState(false);
  const [loading, setLoading] = useState(true);

  // Function to check session on page load
  const checkSession = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/check-session", { withCredentials: true });
      if (response.data.loggedIn) {
        setUser(response.data.user);
        setCheckLogin(true);
      } else {
        setUser(null);
        setCheckLogin(false);
      }
    } catch (error) {
      console.error("Session check failed", error);
      setUser(null);
      setCheckLogin(false);
    } finally {
      setLoading(false);
    }
  };

  // Run once on initial load
  useEffect(() => {
    checkSession();
  }, []);

  // Manual login
  const login = (userData) => {
    setUser(userData);
    setCheckLogin(true);
  };

  // Manual logout
  const logout = async () => {
    try {
      await axios.post("http://localhost:5000/logout", {}, { withCredentials: true });
      setUser(null);
      setCheckLogin(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        checkLogin,
        setCheckLogin,
        login,
        logout,
        loading, // You can use this in your UI to show a loading spinner if needed
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};