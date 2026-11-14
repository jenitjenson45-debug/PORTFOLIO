"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CustomerUser {
  id: string;
  name: string;
  phone: string;
  email: string;
  savedAddresses: Array<{
    id: string;
    label: string;
    street: string;
    landmark?: string;
    city: string;
    pincode: string;
  }>;
}

interface AuthContextType {
  user: CustomerUser | null;
  login: (name: string, phone: string, email?: string) => void;
  logout: () => void;
  favorites: string[];
  toggleFavorite: (foodItemId: string) => void;
  isFavorite: (foodItemId: string) => boolean;
  addAddress: (address: Omit<CustomerUser["savedAddresses"][0], "id">) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<CustomerUser | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("zaffran_user_v1");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        // default guest profile for instant convenience
        const guest: CustomerUser = {
          id: "guest-01",
          name: "Guest Diner",
          phone: "+91 98765 00000",
          email: "guest@zaffran.com",
          savedAddresses: [
            {
              id: "addr-1",
              label: "Home",
              street: "Villa 12, Palm Meadows, Marine Drive",
              landmark: "Opposite Grand Mall",
              city: "Kochi",
              pincode: "682011",
            },
          ],
        };
        setUser(guest);
      }

      const storedFavs = localStorage.getItem("zaffran_favorites_v1");
      if (storedFavs) {
        setFavorites(JSON.parse(storedFavs));
      } else {
        setFavorites(["mandi-01", "fal-01", "ker-01", "chin-01"]);
      }
    } catch (e) {
      console.error("Auth state load error", e);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    if (user) {
      localStorage.setItem("zaffran_user_v1", JSON.stringify(user));
    }
  }, [user, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem("zaffran_favorites_v1", JSON.stringify(favorites));
  }, [favorites, isLoaded]);

  const login = (name: string, phone: string, email = "") => {
    const newUser: CustomerUser = {
      id: "cust-" + Date.now().toString(36),
      name,
      phone,
      email,
      savedAddresses: user?.savedAddresses || [],
    };
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("zaffran_user_v1");
  };

  const toggleFavorite = (foodItemId: string) => {
    setFavorites((prev) =>
      prev.includes(foodItemId)
        ? prev.filter((id) => id !== foodItemId)
        : [...prev, foodItemId]
    );
  };

  const isFavorite = (foodItemId: string) => favorites.includes(foodItemId);

  const addAddress = (address: Omit<CustomerUser["savedAddresses"][0], "id">) => {
    if (!user) return;
    const newAddr = { ...address, id: "addr-" + Date.now().toString(36) };
    setUser({
      ...user,
      savedAddresses: [...user.savedAddresses, newAddr],
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        favorites,
        toggleFavorite,
        isFavorite,
        addAddress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
