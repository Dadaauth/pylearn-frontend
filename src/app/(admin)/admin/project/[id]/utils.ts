import { fetchAPIv1 } from "@/utils/api";


export async function fetchData(params: Promise<{ id: string }>) {
    try {
        const project_id = (await params).id;
        const res = await fetchAPIv1(`/admin/project/${project_id}`);
        if (res.ok) return (await res.json()).data;
        return null;
    } catch {
        return null;
    }
}