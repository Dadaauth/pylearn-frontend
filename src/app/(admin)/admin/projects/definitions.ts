export interface Module {
    id: string,
    title: string,
    status: string,
    description: string,
    prev_module_id: string,
    projects: Project[],
}

export interface Project {
    id: string,
    title: string,
    status: string,
}
