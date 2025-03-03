
export interface MarkDownContent {
    compiledSource?: string | undefined,
    scope?: Record<string, unknown> | undefined,
    frontmatter?: Record<string, unknown> | undefined,
}
export interface Project {
    id: string,
    title: string,
    description: string,
    status: string,
    markdown_content: string,
    module: {
        title: string,
    },
    studentProject: {
        grade: number,
        feedback: string,
    },
    author: {
        first_name: string,
        last_name: string,
    },
    fa_start_date: string,
    sa_start_date: string,
    end_date: string,
    next_project_id: string,
    prev_project_id: string,
}


export interface PageData {
    project: Project,
    next_project: Project,
    prev_project: Project,
}