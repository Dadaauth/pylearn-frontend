import Cookies from "js-cookie";
import { fetchAPIv1 } from "@/utils/api";



export async function fetchData() {
    try {
        const course_id = Cookies.get("course_context")
        const res = await fetchAPIv1(`/admin/${course_id}/projects`);
        if (res.ok) {
            return (await res.json()).data;
        }
        return null
    } catch {
        return null;
    }
}