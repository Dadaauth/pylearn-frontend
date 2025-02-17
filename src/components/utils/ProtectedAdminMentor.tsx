"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { checkAuth, checkUserRole } from "@/utils/auth";

export default function ProtectedAdminMentor({
  children,
}: {
  children: React.ReactNode;
}) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const router = useRouter();

    useEffect(() => {
        (async () => {
            const loggedIn = await checkAuth();
            const userRole = await checkUserRole()
            const admin_or_mentor = userRole == "admin" || userRole == "mentor";
            if (!loggedIn) {
                router.push("/auth/login");
            } else {
                setIsAuthenticated(true);
            }
            if (!admin_or_mentor) {
                router.push("/");
            } else {
                setIsAuthorized(true);
            }
        })();
    }, [router]);

    if (!isAuthenticated) {
        return null;
    }

    if (!isAuthorized) {
        return null;
    }

    return <>{children}</>;
}
