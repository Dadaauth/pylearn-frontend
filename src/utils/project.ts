"use server"
import { cookies } from "next/headers"

export async function MarkProjectAsCompleted(project_id: String) {
    let student_id = (await cookies()).get("user_id")?.value;

    try {
        let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_V1}/project/mark/done`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({student_id, project_id})
        });

        if (res.ok) {
            return true;
        }
        return false;
    } catch(e) {
        return false;
    }
}