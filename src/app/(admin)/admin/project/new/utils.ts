import Cookies from "js-cookie";

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
    } catch(err) {
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
    } catch(err) {
        return [];
    }
}