

export interface Mentors {
    first_name: string;
    last_name: string;
    email: string;
    status: string;
}

export interface CreateMentorModalProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
}