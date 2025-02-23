import Cookies from "js-cookie";


export async function fetchCourses() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_V1}/course/all`, {
            headers: {
                "Authorization": `Bearer ${Cookies.get("access_token")}`
            }
        });

        if (res.ok) {
            const res_json = (await res.json()).data.courses;
            return res_json;
        } else return [];
    } catch(err) {
        return [];
    }
}