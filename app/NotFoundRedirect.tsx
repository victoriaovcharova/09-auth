"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NotFoundRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/not-found");
  }, [router]);

  return null;
}
