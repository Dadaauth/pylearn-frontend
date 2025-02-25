

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

export interface Mentors {
    id: string,
    first_name: string;
    last_name: string;
    email: string;
    status: string;
}

export interface CreateMentorModalProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
}