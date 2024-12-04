"use server"
import { redirect } from "next/navigation";
import { cookies } from "next/headers";


type Credentials = {
    email: string,
    password: string,
    role: string,
}
export async function signIn(credentials: Credentials) {
    "use server"
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
        } else {
            console.log("Error occurred!!!");
            return;
        }
    } catch (e) {
        console.log("Error occurred!!!", e);
        return;
    }

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
// Confirm if the current client is logged in. This is a local check only
    const access_token = (await cookies()).get("access_token");
    const refresh_token = (await cookies()).get("refresh_token");

    if (!access_token || !refresh_token) return false
    return true
}

export async function fetch_basic_user_details() {
    const email = (await cookies()).get("email")?.value;
    const first_name = (await cookies()).get("first_name")?.value;
    const last_name = (await cookies()).get("last_name")?.value;
    const role = (await cookies()).get("role")?.value;
    const user_id = (await cookies()).get("user_id")?.value;
    return {email, first_name, last_name, role, user_id}
}

export async function checkUserRole(user_id: string) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_V1}}/auth/user/role`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({user_id})
        });
    
        if (res.ok) {
            const data = await res.json();
            return data.data.role;
        }
        return "";
    } catch(e) {
        console.error(e);
        return "";
    }
}