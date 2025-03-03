

export interface PageData {
    modules: Module[],
    projects: Project[]
}
interface Module {
    id: string,
    title: string,
}

interface Project {
    id: string,
    title: string,
    fa_duration: string,
    sa_duration: string,
}