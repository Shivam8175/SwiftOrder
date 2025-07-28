import React, { createContext, useState, useEffect } from "react";

// Create context object
export const AuthContext = createContext({
  user: null,
  setUser: () => {},
});

// Context Provider component to wrap your app
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Example: On initial load, try load user from localStorage/token (optional)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Optionally parse user info from token or fetch profile here
      // For demo, assume token means logged in (you can replace with API call)
      setUser({ token });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
