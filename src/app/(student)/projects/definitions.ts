
export interface PageData {
    modules: Module[]
}
export interface Module {
    id: string,
    title: string,
    status: string,
    description: string,
    projects: Project[],
}

export interface Project {
    id: string,
    title: string,
    status: string,
}
