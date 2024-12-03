"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { cookies } from "next/headers";
import { checkAuth, checkUserRole } from "@/utils/auth";

export default function ProtectedAdmin({
  children,
}: {
  children: React.ReactNode;
}) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const router = useRouter();

    useEffect(() => {
        (async () => {
            const loggedIn = await checkAuth();
            const admin = await checkUserRole(String((await cookies()).get("user_id")?.value));
            if (!loggedIn) {
                router.push("/auth/login");
            } else {
                setIsAuthenticated(true);
            }
            if (!admin) {
                router.push("/");
            } else {
                setIsAdmin(true);
            }
        })();
    }, []);

    if (!isAuthenticated) {
        return null;
    }

    if (!isAdmin) {
        return null;
    }

    return <>{children}</>;
}
