"use client"
import { checkAuth, fetch_basic_user_details, SignOut } from "@/utils/auth";
import { Button, Link, Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react";
import { useEffect, useState } from "react";

interface User {
    email?: string,
    first_name?: string,
    last_name?: string,
    role?: string,
}
export default function AppNavBar() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState<User>({
        "email": undefined,
        "first_name": undefined,
        "last_name": undefined,
        "role": undefined,
    });

    useEffect(() => {
        (async () => setLoggedIn(await checkAuth()))();
        (async () => setUser(await fetch_basic_user_details()))();
    },[])
    return (
        <Navbar>
            <NavbarBrand>
                <p>A-SWE</p>
            </NavbarBrand>
            <NavbarContent justify="end">
                {loggedIn?
                    <>
                        <p>Welcome {user.first_name}</p>
                        <Button onPress={() => SignOut()}>Logout</Button>
                    </>
                    :
                    <>
                        <Button
                            variant="ghost"
                            as={Link}
                            href="/auth/login"
                        >Login</Button>
                        <Button
                            as={Link}
                            href="/auth/register"
                        >SignUp</Button>
                    </>
                }
            </NavbarContent>
        </Navbar>
    );
}