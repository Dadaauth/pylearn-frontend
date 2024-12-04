"use server"
import { cookies } from "next/headers"

export async function RetrieveProjectsStatuses(p_ids: Array<string>) {
    const student_id = (await cookies()).get("user_id")?.value;

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_V1}/project/status`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({projects: p_ids, student_id})
        });

        if (res.ok) {
            const data = await res.json();
            return data.data.statuses;
        }

        return []
    } catch (e) {
        console.error(e);
        return []
    }
}

export async function MarkProjectAsCompleted(project_id: string) {
    const student_id = (await cookies()).get("user_id")?.value;

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_V1}/project/mark/done`, {
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
        console.error(e);
        return false;
    }
}