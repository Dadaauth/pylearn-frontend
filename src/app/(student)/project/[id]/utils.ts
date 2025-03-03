import { fetchAPIv1 } from "@/utils/api";


export async function submitProject(data: {project_id: string, submission_file: string}) {
    try {
        const res = await fetchAPIv1(`/student/project/${data.project_id}/submit`, undefined, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({submission_file: data.submission_file}),
        })
        if (res.ok) {
            return true;
        }
        return false;
    } catch {
        return false;
    }
}