import { Button, Link, Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react";

export default function AppNavBar() {
    return (
        <Navbar>
            <NavbarBrand>
                <p>A-SWE</p>
            </NavbarBrand>
            <NavbarContent justify="end">
                <Button
                    variant="ghost"
                    as={Link}
                    href="/auth/login"
                >Login</Button>
                <Button
                    as={Link}
                    href="/auth/register"
                >SignUp</Button>
            </NavbarContent>
        </Navbar>
    );
}