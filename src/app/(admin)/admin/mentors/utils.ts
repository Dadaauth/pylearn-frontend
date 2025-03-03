import { fetchAPIv1 } from "@/utils/api";


export async function fetchData() {
    try {
        const res = await fetchAPIv1("/admin/mentors");
        if (res.ok) return (await res.json()).data;
        return null;
    } catch {
        return null;
    }
}
