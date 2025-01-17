import Cookies from "js-cookie"

export async function retrieve_projects_with_submissions() {
    // This function will retrieve data to be displayed in
    // the projects dropdown
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_V1}/admin/projects/with_submissions`, {
            headers: {
                "Authorization": `Bearer ${Cookies.get("access_token")}`,
            },
        })
        if (res.ok) {
            return (await res.json()).data.projects;
        } else return [];
    } catch(err) {
        return [];
    }
}

export async function i_RefreshSubmissionTable(project_id: string) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_V1}/admin/${project_id}/assigned_submissions`, {
            headers: {
                "Authorization": `Bearer ${Cookies.get("access_token")}`
            }
        });

        if (res.ok) {
            return (await res.json()).data;
        } else {
            return false;
        }
    } catch(err) {
        return false;
    }
}

export async function generateStudentSubmission(project_id: string) {

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_V1}/admin/${project_id}/submissions/generate`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${Cookies.get("access_token")}`,
            },
        });

        if (res.ok) return true
        else if (res.status == 404) return "No Submissions Found"
        else return false;
    } catch (err) {
        return false;
    }
}