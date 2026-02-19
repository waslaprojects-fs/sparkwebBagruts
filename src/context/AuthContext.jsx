import React, { createContext, useContext, useState, useEffect } from "react";

const AUTH_KEY = "spark_member";
const DEFAULT_PASSWORD = "spark"; // change in production / use env

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    try {
      setIsLoggedIn(localStorage.getItem(AUTH_KEY) === "1");
    } catch (_) {}
    setChecked(true);
  }, []);

  const login = (password) => {
    const ok = password === DEFAULT_PASSWORD;
    if (ok) {
      try {
        localStorage.setItem(AUTH_KEY, "1");
      } catch (_) {}
      setIsLoggedIn(true);
    }
    return ok;
  };

  const logout = () => {
    try {
      localStorage.removeItem(AUTH_KEY);
    } catch (_) {}
    setIsLoggedIn(false);
  };

  const value = { isLoggedIn, login, logout, checked };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
