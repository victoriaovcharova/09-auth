"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/lib/store/authStore";
import { getSession, getCurrentUser } from "@/lib/api/clientApi";
import { usePathname } from "next/navigation";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, user, setUser, clearAuth } = useAuthStore();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = await getSession();

        if (session.success) {
          if (!isAuthenticated || !user) {
            const userData = await getCurrentUser();
            setUser(userData);
          }
        } else {
          if (isAuthenticated || user) {
            clearAuth();
          }
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        if (isAuthenticated || user) {
          clearAuth();
        }
      }
    };

    checkAuth();

  }, [pathname, isAuthenticated, user, setUser, clearAuth]);

  return <>{children}</>;
}
