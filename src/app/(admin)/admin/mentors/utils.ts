import Cookies from "js-cookie";


export async function fetchMentors() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_V1}/mentor/all`, {
            headers: {
                "Authorization": `Bearer ${Cookies.get("access_token")}`
            }
        });

        if (res.ok) {
            return (await res.json()).data.mentors;
        } else {
            console.log("An error occured when fetching mentors");
        }
    } catch (err) {
        console.log("An error occured when fetching mentors");
    }
}