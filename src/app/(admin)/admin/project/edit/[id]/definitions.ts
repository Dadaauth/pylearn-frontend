export interface Module {
    key: string,
    title: string,
}
export interface Projects {
    id: string,
    key: string,
    title: string,
    duration_in_days: number,
}

export interface Project {
    id: string,
    title: string,
    module_id: string,
    description: string,
    markdown_content: string,
    status: string,
    prev_project_id: string,
    duration_in_days: number,
    release_range: number,
}