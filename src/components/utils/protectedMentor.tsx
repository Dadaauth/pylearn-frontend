"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { checkAuth, checkUserRole, fetch_basic_user_details } from "@/utils/auth";

export default function ProtectedMentor({
  children,
}: {
  children: React.ReactNode;
}) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isMentor, setIsMentor] = useState(false);
    const router = useRouter();

    useEffect(() => {
        (async () => {
            const loggedIn = await checkAuth();
            const mentor = (await checkUserRole()) == "mentor";
            if (!loggedIn) {
                router.push("/auth/login");
            } else {
                setIsAuthenticated(true);
            }
            if (!mentor) {
                router.push("/");
            } else {
                setIsMentor(true);
            }
        })();
    }, [router]);

    if (!isAuthenticated) {
        return null;
    }

    if (!isMentor) {
        return null;
    }

    return <>{children}</>;
}
