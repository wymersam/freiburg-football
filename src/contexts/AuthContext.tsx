import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call - replace with real authentication
    const users = JSON.parse(localStorage.getItem("registered-users") || "[]");
    const foundUser = users.find(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (u: any) => u.email === email && u.password === password
    );

    if (foundUser) {
      const user = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
      };
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      return true;
    }
    return false;
  };

  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    // Simulate API call - replace with real authentication
    const users = JSON.parse(localStorage.getItem("registered-users") || "[]");

    // Check if user already exists
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (users.find((u: any) => u.email === email)) {
      return false;
    }

    const newUser = {
      id: crypto.randomUUID(),
      name,
      email,
      password, // In real app, this should be hashed
    };

    users.push(newUser);
    localStorage.setItem("registered-users", JSON.stringify(users));

    const user = { id: newUser.id, name: newUser.name, email: newUser.email };
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
