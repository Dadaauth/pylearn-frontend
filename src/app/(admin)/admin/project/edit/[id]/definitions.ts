export interface PageData {
    currentProject: Project,
    projects: Project[],
    modules: Module[],
}
export interface Module {
    id: string,
    title: string,
}

export interface Project {
    id: string,
    title: string,
    module_id: string,
    description: string,
    markdown_content: string,
    status: string,
    fa_duration: number,
    sa_duration: number,
    release_range: number,
    prev_project_id: string,
    next_project_id: string,
}