"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { checkAuth, checkUserRole, fetch_basic_user_details } from "@/utils/auth";

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
            const admin = (await checkUserRole()) == "admin";
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
    }, [router]);

    if (!isAuthenticated) {
        return null;
    }

    if (!isAdmin) {
        return null;
    }

    return <>{children}</>;
}
