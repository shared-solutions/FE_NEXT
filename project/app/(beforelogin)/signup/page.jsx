"use client";

import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  router.replace("/i/signup");
  return null;
}
