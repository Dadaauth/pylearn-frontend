import Cookies from "js-cookie"

export async function fetchCohortWithStudents(cohort_id: string) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_V1}/cohort/${cohort_id}/students`, {
            headers: {
                "Authorization": `Bearer ${Cookies.get("access_token")}`,
            },
        });

        if (res.ok) {
            return (await res.json()).data.cohort
        } else return false;
    } catch {
        return false;
    }
}


export async function fetchStudentsWithNoCohortAssigned(course_id: string) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_V1}/student/no-cohort/${course_id}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${Cookies.get("access_token")}`,
            },
        });

        if (res.ok) {
            const res_json = (await res.json()).data.students;
            console.log(res_json);
            return res_json;
        } else return [];
    } catch {
        return [];
    }
}