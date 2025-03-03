export interface PageData {
    cohorts: Cohort[],
    mentors: Mentor[],
}


export interface Cohort {
    id: string,
    course: {
        id: string,
        status: string,
        title: string,
    },
    course_id: string,
    name: string,
    status: string,
}

export interface Mentor {
    id: string,
    first_name: string,
    last_name: string,
    email: string,
    status: string,
    cohorts: Cohort[],
}

export interface CreateMentorModalProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
}