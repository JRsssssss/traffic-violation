"use client";

import { usePathname } from "next/navigation";
import Navbar from "./navbar";
import RequireAuth from "./RequireAuth";

export default function NavbarWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  return (
    <div className={`flex ${isLoginPage ? "" : "ml-60 p-6 rounded-lg"} w-full h-full overflow-auto`}>
      {!isLoginPage && <Navbar />}
      <main className="w-full">{children}</main>
    </div>
  );
}
