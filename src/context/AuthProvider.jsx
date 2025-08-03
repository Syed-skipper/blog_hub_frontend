import { useState } from "react";
import AuthContext from "./AuthContext";

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user_id, setUserId] = useState(localStorage.getItem("user_id") || "");
  const [isAuthenticated, setAuthenticated] = useState(!!token);
  return (
    <AuthContext.Provider value={{ isAuthenticated, token, user_id, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}
