import Cookies from "js-cookie"


export async function fetchModules() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_V1}/student/modules`, {
            headers: {
                "Authorization": `Bearer ${Cookies.get("access_token")}`
            }
        });

        if (res.ok) {
            return (await res.json()).data.modules;
        } else {
            return [];
        }
    } catch (err) {
        return [];
    }
}