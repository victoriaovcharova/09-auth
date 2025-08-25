// lib/api/serverApi.ts
import { cookies } from "next/headers";
import { nextServer } from "./api";
import type { User } from "@/types/user";

function buildCookieHeaderFromStore(store: Awaited<ReturnType<typeof cookies>>) {
  // cookies().getAll() -> [{ name, value }, ...] -> "a=1; b=2"
  return store.getAll().map(c => `${c.name}=${c.value}`).join("; ");
}

export const getProfile = async (): Promise<User> => {
  const store = await cookies();
  const cookieHeader = buildCookieHeaderFromStore(store);

  const res = await nextServer.get<User>("/users/me", {
    headers: cookieHeader ? { Cookie: cookieHeader } : undefined,
    // withCredentials не обязателен, т.к. мы пробрасываем Cookie вручную
  });

  return res.data;
};

export const checkServerSession = async (): Promise<boolean> => {
  const store = await cookies();
  const cookieHeader = buildCookieHeaderFromStore(store);

  const res = await nextServer.get<{ success: boolean }>("/auth/session", {
    headers: cookieHeader ? { Cookie: cookieHeader } : undefined,
  });

  return !!res.data?.success;
};
