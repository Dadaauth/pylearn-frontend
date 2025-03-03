import { fetchAPIv1 } from "@/utils/api";


export async function fetchData() {
    try {
        const res = await fetchAPIv1('/student/projects')
        if (res.ok) {
            return (await res.json()).data;
        } else return null;
    } catch {
        return null;
    }
}