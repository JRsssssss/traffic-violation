"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";


export default function Page() {
  const router = useRouter();

  useEffect(() => {
    // Check if the user is authenticated (adjust according to your auth logic)
    const isAuthenticated = localStorage.getItem("auth") === "true";

    if (isAuthenticated) {
      router.push("/trafficviolation"); // Redirect to dashboard if logged in
    } else {
      router.push("/login"); // Redirect to login page if not logged in
    }
  }, []);

  return (
    <div>Loading...</div>
  );
}
