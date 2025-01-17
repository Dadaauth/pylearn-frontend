import Cookies from "js-cookie";

export async function fetchProjects(module_id: string) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_V1}/project/all?module_id=${module_id}`, {
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
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_V1}/module`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${Cookies.get("access_token")}`
            }
        })

        if (res.ok) {
            let modules = (await res.json()).data.modules;

            for (let i = 0; i < modules.length; i++) {
                let projects = await fetchProjects(modules[i].id);
                modules[i].projects = projects;
            }
            return modules;
        } else return [];
    } catch(err) {
        return [];
    }
}