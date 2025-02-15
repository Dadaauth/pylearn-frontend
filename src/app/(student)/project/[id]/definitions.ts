
export interface Project {
    id: string,
    title: string,
    description: string,
    status: string,
    module: string,
    author: string,
    grade: string,
    next_project: {
        id: string,
        status: string,
    },
    prev_project: {
        id: string,
        status: string,
    },
}