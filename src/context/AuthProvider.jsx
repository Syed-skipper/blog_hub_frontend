import { useState, useEffect } from "react";
import AuthContext from "./AuthContext";

export default function AuthProvider({ children }) {
  const [token, setToken] = useState('');
  const [user_id, setUserId] = useState('');
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const Token = localStorage.getItem("token");
    const UserId = localStorage.getItem("user_id");

    if (Token) {
      setToken(Token);
      setAuthenticated(true);
    }

    if (UserId) {
      setUserId(UserId);
    }

    setLoading(false);
  }, []);

  if (loading) return null;

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, token, user_id, setToken, setUserId }}
    >
      {children}
    </AuthContext.Provider>
  );
}
