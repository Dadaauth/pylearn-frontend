"use server"
import { redirect } from "next/navigation";
import { cookies } from "next/headers";


type Credentials = {
    username: string,
    password: string,
    role: string,
}
export async function signIn(credentials: Credentials) {
    "use server"
    let role = "";
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_V1}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({...credentials}),
        });

        if (res.ok) {
            console.log("Login Successful");
            const data = (await res.json()).data
            for (const key in data) {
                cookies().set(key, data[key])
            }
            role = data["role"]
        } else {
            console.log("Error occurred!!!");
            console.log(await res.json());
            return false;
        }
    } catch (e) {
        console.log("Error occurred!!!", e);
        return false;
    }
    // if (role == "admin") {
    //     redirect('/admin');
    // }
    redirect("/");
}

export async function SignOut() {
    "use server"
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_V1}/auth/logout`);

        if (res.ok) {
            const cks = (await cookies()).getAll()
            for (let i = 0; i < cks.length; i++) {
                (await cookies()).delete(cks[i].name);
            }
            console.log("Logout Successful");
        } else {
            console.log("Error occurred!!!");
            return;
        }
    } catch (e) {
        console.log("Error occurred!!!", e);
        return;
    }

    redirect("/auth/login");
}

export async function checkAuth() {
    const access_token = (await cookies()).get("access_token");
    const refresh_token = (await cookies()).get("refresh_token");

    if (!access_token || !refresh_token) return false

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_V1}/auth/is_logged_in`, {
            headers: {
            "Authorization": `Bearer ${(await cookies()).get("access_token")?.value}`,
            }
        });

        if (res.ok) {
            return true;
        } else {
            console.log("Error occurred!!!");
            return false;
        }
    } catch (e) {
        console.log("Error occurred!!!");
        return false;
    }
}

export async function checkUserRole() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_V1}/auth/user/role`, {
            headers: {
                "Authorization": `Bearer ${(await cookies()).get("access_token")?.value}`,
            }
        });

        if (res.ok) {
            return (await res.json()).data.role;
        } else {
            console.log("Error occurred!!!");
            return "";
        }
    } catch (e) {
        console.log("Error occurred!!!");
        return "";
    }
}

export async function fetch_basic_user_details() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_V1}/auth/basic_user_details`, {
            headers: {
                "Authorization": `Bearer ${(await cookies()).get("access_token")?.value}`,
            }
        });

        if (res.ok) {
            let details = await res.json();
            console.log(details);
            return details
        } else {
            console.log("Error occurred!!!");
            return {};
        }
    } catch (e) {
        console.log("Error occurred!!!", e);
        return {};
    }
}