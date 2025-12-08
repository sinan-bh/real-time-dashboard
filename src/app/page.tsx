"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const navigate = useRouter();
  useEffect(() => {
    navigate.replace("/d/dashboard");
  }, []);
  return null;
}
