"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Alert, Button, Form, Input, Select, SelectItem, Textarea, VisuallyHidden } from "@nextui-org/react";
import Cookies from "js-cookie";

import { fetchModules } from "./utils";
import { ForwardRefEditor } from "@/components/utils/ForwardRefEditor";

interface Module {
    key: string,
    title: string,
    projects: Project[],
}
interface Project {
    key: string,
    title: string,
}


export function ProjectCreateForm() {
    const [mode, setMode] = useState("draft");
    const [modules, setModules] = useState<Module[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const router = useRouter();
    const [showError, setShowError] = useState(false);
    const [markdown_content, setMarkDownContent] = useState("");

    useEffect(() => {
        async function fetchData() {
            const tmp = await fetchModules();
            const mds = [];
            for (let i = 0; i < tmp.length; i++) {
                let key = tmp[i].id;
                let title = tmp[i].title;
                let projects = tmp[i].projects;
                mds.push({key, title, projects});
            }
            setModules(mds);
        }

        fetchData();
    }, []);

    function handleModuleSelectionChange(e: React.ChangeEvent<HTMLSelectElement>) {
        for (let i = 0; i < modules.length; i++) {
            if (modules[i].key == e.target.value) {
                setProjects(modules[i].projects);
                break;
            }
        }
    }

    async function submitProjectCreateForm(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        data.mode = mode;
        if (data.prev_project_id == "")
            delete data.prev_project_id

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_V1}/project/create`, {
                method: "POST",
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
                <Form
                    onSubmit={submitProjectCreateForm}
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
                                onChange={handleModuleSelectionChange}
                                isRequired
                            >
                                {(module) => <SelectItem>{module.title}</SelectItem>}
                            </Select>
                            <Select
                                className="max-w-md"
                                items={projects}
                                label="Prev Project"
                                placeholder="Select the previous project"
                                name="prev_project_id"
                            >
                                {(project) => <SelectItem>{project.title}</SelectItem>}
                            </Select>
                            <Input
                                type="text"
                                name="title"
                                label="Project Title"
                                maxLength={300}
                                isRequired
                            />
                            <Input
                                type="text"
                                name="description"
                                label="Short Description"
                                maxLength={300}
                            />
                            <VisuallyHidden>
                                <Input
                                    name="markdown_content"
                                    value={markdown_content}
                                    hidden
                                />
                            </VisuallyHidden>
                        </div>
                        <ForwardRefEditor
                            onChange={setMarkDownContent} markdown=""
                            contentEditableClassName="border-black rounded-md border-b-1"
                            placeholder="insert markdown content here"
                        />
                    </div>
                    <div className="w-full flex flex-row justify-between items-center">
                        {/* <Button onClick={() => setMode("draft")} className="bg-[#F94144] text-white" type="submit" isDisabled>Draft</Button> */}
                        <Button onClick={() => setMode("publish")} className="bg-[#2EC4B6] text-white" type="submit">Publish</Button>
                    </div>
                </Form>
        </div>
    );
}