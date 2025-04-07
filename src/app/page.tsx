"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";


export default function Page() {
  const router = useRouter();

  useEffect(() => {
    router.push("/login"); // Redirect to login page if not logged in
  }, []);

  return (
    <div>Loading...</div>
  );
}
