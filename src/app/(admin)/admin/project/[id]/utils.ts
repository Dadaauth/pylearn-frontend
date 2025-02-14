import Cookies from "js-cookie"

export async function fetchProjectDetails(project_id: string) {

    if (!project_id)
        return {
            id: "",
            title: "",
            description: "",
            markdown_content: "",
            status: "",
            module: "",
            author: "",
        }

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_V1}/admin/project/${project_id}`, {
            headers: {
                "Authorization": `Bearer ${Cookies.get("access_token")}`
            }
        });

        if (res.ok) {
            return (await res.json()).data.project
        } else {
            return {
                id: "",
                title: "",
                description: "",
                markdown_content: "",
                status: "",
                module: "",
                author: "",
            }
        }
    } catch(err) {
        return {
            id: "",
            title: "",
            description: "",
            markdown_content: "",
            status: "",
            module: "",
            author: "",
        }
    }
}