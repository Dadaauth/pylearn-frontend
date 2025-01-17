

export interface StudentSubmissions {
    student_name: string,
    project_title: string,
    submission_date: string,
    submission_file: string,
    student_project_id: string,
}

export interface Project {
    id: string,
    title: string,
    description: string,
}