"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { checkAuth } from "@/utils/auth";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        (async () => {
            const loggedIn = await checkAuth();
            if (!loggedIn) {
                router.push("/auth/login");
            } else {
                setIsAuthenticated(true);
            }
        })();
    }, []);

    if (!isAuthenticated) {
        return null;
    }

    return <>{children}</>;
}
