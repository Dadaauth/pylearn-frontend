import Cookies from "js-cookie"


export async function fetchCurrentProjectsForStudent() {

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_V1}/student/projects/current`, {
            headers: {
                "Authorization": `Bearer ${Cookies.get("access_token")}`,
            },
        });

        if (res.ok) {
            return (await res.json()).data.projects;
        } else {
            return [];
        }
    } catch (err) {
        console.log("An error occured!");
        return [];
    }
}