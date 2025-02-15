import Cookies from "js-cookie"

export async function submitProject(data: {project_id: string, submission_file: string}) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_V1}/student/project/${data.project_id}/submit`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${Cookies.get("access_token")}`,
                "content-Type": "application/json",
            },
            body: JSON.stringify({submission_file: data.submission_file}),
        });

        if (res.ok) {
            return true;
        }
        return false;
    } catch(err) {
        console.log("An error occured!!");
        return false;
    }
}

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
            grade: "",
        }

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_V1}/student/project/${project_id}`, {
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
                grade: "",
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
            grade: "",
        }
    }
}