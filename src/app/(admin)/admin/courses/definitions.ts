

export interface Cohort {
    id: string,
    name: string,
    students: number,
}

export interface Course {
    title: string,
    id: string,
    status: string,
    communication_channel: string,
    cohorts: Cohort[]
}