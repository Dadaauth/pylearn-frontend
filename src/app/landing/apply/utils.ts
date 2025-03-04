


export async function fetchCourses() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_V1}/course/all`);

        if (res.ok) {
            const res_json = (await res.json()).data.courses
            for (const course of res_json) {
                delete course["cohorts"]
            }
            return res_json;
        } else {
            return [];
        }
    } catch {
        return [];
    }
}