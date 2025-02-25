import Cookies from "js-cookie";


export async function fetchAllCohorts() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_V1}/cohort/all`, {
            headers: {
                "Authorization": `Bearer ${Cookies.get("access_token")}`,
            }
        });
        if (res.ok) {
            return (await res.json()).data.cohorts;
        } else console.log("An error occured when fetching cohorts");
    } catch(err) {
        console.log("An error occured when fetching cohorts");
    }
}

export async function fetchCohortsAssignedToMentor(mentor_id: string) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_V1}/mentor/${mentor_id}/assigned_cohorts`, {
            headers: {
                "Authorization": `Bearer ${Cookies.get("access_token")}`,
            }
        });
        if (res.ok) {
            return (await res.json()).data.cohorts;
        } else console.log("An error occured when fetching cohorts");
    } catch(err) {
        console.log("An error occured when fetching cohorts");
    }
}

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