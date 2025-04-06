"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/Context/AuthContext";

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push("/login");
        }
    }, [user, router]);

    if (!user) {
        return <div>Loading...</div>; // Or a spinner
    }

    return <>{children}</>;
};

export default RequireAuth;
