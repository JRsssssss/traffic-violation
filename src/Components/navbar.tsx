"use client";
import Link from "next/link";
import React from "react";
import { FiLogOut } from "react-icons/fi";
import { GoAlertFill } from "react-icons/go";
import { FaCarCrash, FaUser } from "react-icons/fa";
import { IoStatsChart } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/Context/AuthContext";
import RequireAuth from "./RequireAuth";

const Navbar = () => {
  const router = useRouter();
  const { user, setUser } = useAuth();
  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };
  return (
    <RequireAuth>
      <nav className="fixed top-0 left-0 h-full w-auto bg-gray-800 text-white p-6 flex flex-col gap-4 shadow-lg">
        <div className="flex flex-col flex-grow gap-4">
          <Link
            href="/trafficviolation"
            className="p-4 hover:bg-gray-700 rounded-lg flex gap-4 items-center"
          >
            <FaCarCrash size={30} />
            <span>Traffic Violations</span>
          </Link>
          {user?.role !== "Officer" && (
            <Link
              href="/manage_users"
              className="p-4 hover:bg-gray-700 rounded-lg flex gap-4 items-center"
            >
              <FaUser size={30} />
              <span>Manage Users</span>
            </Link>
          )}
          {user?.role === "Officer" && (
            <Link
              href="/report"
              className="p-4 hover:bg-gray-700 rounded-lg flex gap-4 items-center"
            >
              <GoAlertFill size={30} />
              <span>My Report</span>
            </Link>
          )}
          {user?.role === "Administrator" && (
            <Link
              href="/report"
              className="p-4 hover:bg-gray-700 rounded-lg flex gap-4 items-center"
            >
              <GoAlertFill size={30} />
              <span>Report</span>
            </Link>
          )}
          <Link
            href="/dashboard"
            className="p-4 hover:bg-gray-700 rounded-lg flex gap-4 items-center"
          >
            <IoStatsChart size={30} />
            <span>Dashboard</span>
          </Link>
        </div>

        {/* Logout Button */}
        <button
          onClick={() => logout()}
          className="p-4 bg-red-600 hover:bg-red-700 rounded-lg text-center flex items-center gap-5"
        >
          <FiLogOut size={20} /> {/* Logout Icon */}
          <span>Logout</span>
        </button>
      </nav>
    </RequireAuth>
  );
};

export default Navbar;
