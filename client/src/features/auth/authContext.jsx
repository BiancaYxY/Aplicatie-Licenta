import React from "react";
import { createContext, useContext, useState } from "react";
import { loginRequest } from "./Login/loginApi"; 
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = async (email, password) => {
    try {
      const userData = await loginRequest(email, password);
      setUser(userData);
      navigate("/dashboard");
    } catch (err) {
      alert("Login esuat");
    }
  };

  const logout = () => {
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);