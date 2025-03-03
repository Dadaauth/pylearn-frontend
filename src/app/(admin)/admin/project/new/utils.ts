import { fetchAPIv1 } from "@/utils/api";
import Cookies from "js-cookie";

export async function fetchData () {
    try {
        const course_id = Cookies.get("course_context");
        const res = await fetchAPIv1(`/admin/${course_id}/project/new`);
        if (res.ok) return (await res.json()).data;
        return null;
    } catch {
        return null;
    }
}

export async function fetchProjects() {
    try {
        const course_id = Cookies.get("course_context");
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_V1}/project/${course_id}/for-admin/all`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${Cookies.get("access_token")}`
            }
        })

        if (res.ok) {
            return (await res.json()).data.projects;
        } else return [];
    } catch {
        return [];
    }
}

export async function fetchModules() {
    try {
        const course_id = Cookies.get("course_context");
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_V1}/module/${course_id}/all`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${Cookies.get("access_token")}`
            }
        })

        if (res.ok) {
            return (await res.json()).data.modules;
        } else return [];
    } catch {
        return [];
    }
}