"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button, Form, Alert, Input, Select, SelectItem, Textarea, VisuallyHidden } from "@heroui/react";
import Cookies from "js-cookie";

import { fetchModules, fetchProjects } from "../../../projects/utils";
import { Module, Projects, Project } from "./definitions";
import { updateCurrentProject } from "./utils";
import { ForwardRefEditor } from "@/components/utils/ForwardRefEditor";

export default function ProjectEditForm({ project_id }: { project_id: string }) {
    const router = useRouter();
    const [mode, setMode] = useState("draft");
    const [modules, setModules] = useState<Module[]>([]);
    const [projects, setProjects] = useState<Projects[]>([]);
    const [currentProject, setCurrentProject] = useState<Project>({
        id: "",
        title: "",
        module_id: "",
        description: "",
        markdown_content: "",
        status: "",
        prev_project_id: "",
        release_range: 0,
        duration_in_days: 0,
    });
    const [showError, setShowError] = useState(false);
    const [loading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const tmp_current_project = await updateCurrentProject(project_id, setCurrentProject);


            const tmp_modules = await fetchModules();
            const tmp_projects = await fetchProjects();
            const mds = [];
            for (let i = 0; i < tmp_modules.length; i++) {
                const key = tmp_modules[i].id;
                const title = tmp_modules[i].title;
                mds.push({key, title});
            }
            setModules(mds);

             // set the previous projects Select Option Input
             const pjts_temp = [];
             for (let project of tmp_projects) {
                if (project.id != tmp_current_project.id) {
                    pjts_temp.push(project);
                }
             }
            setProjects(pjts_temp);
            setIsLoading(false);
        }

        fetchData();
    }, [project_id]);

    async function submitProjectEditForm(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
    
        data.mode = mode;
        if (data.prev_project_id == "")
            delete data.prev_project_id

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_V1}/project/edit/${project_id}`, {
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${Cookies.get("access_token")}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
    
            if (res.ok) {
                router.push("/admin/projects");
            } else {
                setShowError(true);
            }
        } catch (err) {
            setShowError(true);
        }
    }

    return (
        <div className="my-6">
            {showError &&
                <Alert
                    color="error"
                    title="An Error Occured!"
                />
            }
            {!loading &&
                <Form
                    onSubmit={submitProjectEditForm}
                    validationBehavior="native"
                >
                    <div className="w-full flex flex-wrap flex-row justify-center gap-4">
                        <div className="flex flex-col gap-4 w-96">
                            <Select
                                className="max-w-md"
                                items={modules}
                                label="Module"
                                placeholder="Select a Module"
                                name="module_id"
                                defaultSelectedKeys={[currentProject.module_id]}
                                isRequired
                            >
                                {(module) => <SelectItem>{module.title}</SelectItem>}
                            </Select>
                            <Select
                                className="max-w-md"
                                items={projects}
                                label="Previous Project"
                                placeholder="Select the previous project"
                                defaultSelectedKeys={[currentProject.prev_project_id]}
                                name="prev_project_id"
                            >
                                {(project) => <SelectItem>{project.title} - {project.duration_in_days} days long</SelectItem>}
                            </Select>
                            <Input
                                type="text"
                                name="title"
                                label="Project Title"
                                maxLength={300}
                                defaultValue={currentProject.title}
                                isRequired
                            />
                            <Input
                                type="text"
                                name="description"
                                label="Short Description"
                                defaultValue={currentProject.description}
                                maxLength={300}
                            />
                            <Input
                                type="number"
                                name="duration_in_days"
                                label="Duration Of Project"
                                defaultValue={`${currentProject.duration_in_days}`}
                            />
                            <Input
                                type="number"
                                name="release_range"
                                label="Release Range From Previous Project"
                                defaultValue={`${currentProject.release_range}`}
                            />
                            <VisuallyHidden>
                                <Input
                                    name="markdown_content"
                                    value={currentProject.markdown_content}
                                    hidden
                                />
                            </VisuallyHidden>
                        </div>
                        <ForwardRefEditor
                            onChange={(v) => currentProject.markdown_content = v}
                            markdown={currentProject.markdown_content}
                            contentEditableClassName="border-black rounded-md border-b-1"
                            placeholder="insert markdown content here"
                        />
                        <Button onClick={() => setMode("publish")} className="bg-[#2EC4B6] text-white" type="submit">Publish</Button>
                    </div>
                </Form>
            }
        </div>
    );
}