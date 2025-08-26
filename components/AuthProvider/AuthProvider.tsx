// components/AuthProvider/AuthProvider.tsx

"use client";

import { checkSession, getMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const setUser = useAuthStore((state) => state.setUser);
  const [loading, setLoading] = useState(false);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated
  );

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        // Перевіряємо сесію
        const isAuthenticated = await checkSession();
        if (isAuthenticated) {
          // Якщо сесія валідна — отримуємо користувача
          const user = await getMe();
          if (user) {
            setUser(user);
          }
        } else {
          // Якщо сесія невалідна — чистимо стан
          clearIsAuthenticated();
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [setUser, clearIsAuthenticated]);

  return loading ? <p>Loading...</p> : children;
};

export default AuthProvider;
