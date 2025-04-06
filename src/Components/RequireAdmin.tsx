"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/Context/AuthContext";

const RequireAdmin = ({ children }: { children: React.ReactNode }) => {
    const { user } = useAuth();
    const router = useRouter();
    console.log(user);
    useEffect(() => {
        if (!user) {
            router.push("/login");
        } 
        else if (user.role.toLowerCase() !== "administrator") {
            router.push("/unauthorized");
        }
    }, [user]);

    if (user?.role.toLowerCase() !== "administrator") {
        return null;
    }

    return <>{children}</>;
};

export default RequireAdmin;
