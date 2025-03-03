import { fetchAPIv1 } from "@/utils/api";
import Cookies from "js-cookie";

export async function retrieve_projects_with_submissions() {
    // This function will retrieve data to be displayed in
    // the projects dropdown
    const cohort_id = Cookies.get("cohort_context");
    try {
        const res = await fetchAPIv1(`/project/${cohort_id}/projects/with_submissions`)
        if (res.ok) return (await res.json()).data.projects;
        else return [];
    } catch { return [] }
}

export async function i_RefreshSubmissionTable(project_id: string) {
    try {
        const res = await fetchAPIv1(`/project/${project_id}/assigned_submissions`)
        if (res.ok) return (await res.json()).data;
        else return false;
    } catch { return false }
}

export async function generateStudentSubmission(project_id: string) {

    try {
        const res = await fetchAPIv1(`/project/${project_id}/submissions/generate`)
        if (res.ok) return true
        else if (res.status == 404) return "No Submissions Found"
        else return false;
    } catch { return false }
}