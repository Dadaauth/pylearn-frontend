import { fetchAPIv1 } from "@/utils/api";


export async function countCompletedProjectsAndModules() {
    try {
        const res = await fetchAPIv1('/student/count/completed');
        if (res.ok) return (await res.json()).data;
        else return false;
    } catch {
        return false;
    }
}

export async function fetchCurrentProjectsForStudent() {

    try {
        const res = await fetchAPIv1('/student/projects/current')
        if (res.ok) {
            return (await res.json()).data.projects;
        } else {
            return [];
        }
    } catch {
        return [];
    }
}