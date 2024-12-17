"use client"
import Link from "next/link";
import { checkAuth, fetch_basic_user_details, SignOut } from "@/utils/auth";
import { Button, Link as Link_K, Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Spinner } from "@nextui-org/react";

interface User {
    email?: string,
    first_name?: string,
    last_name?: string,
    role?: string,
}
export default function AppNavBar() {
    const [loading, setLoading] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState<User>({
        "email": undefined,
        "first_name": undefined,
        "last_name": undefined,
        "role": undefined,
    });

    useEffect(() => {
        (async () => setLoggedIn(await checkAuth()))();
        (async () => {
            setUser(await fetch_basic_user_details());
            setLoading(false);
        })();
    },[])
    return (
        <Navbar>
            <NavbarBrand>
                <Link href={"/"} color="foreground">
                    <p>A-SWE</p>
                </Link>
            </NavbarBrand>
            <NavbarContent justify="end">
            {loading && <Spinner />}
                {loggedIn?
                    <>
                        <p>Welcome {user.first_name}</p>
                        <Button onPress={() => SignOut()}>Logout</Button>
                    </>
                    :
                    <>
                        <Button
                            variant="ghost"
                            as={Link_K}
                            href="/auth/login"
                        >Login</Button>
                        <Button
                            as={Link_K}
                            href="/auth/register"
                        >SignUp</Button>
                    </>
                }
            </NavbarContent>
        </Navbar>
    );
}