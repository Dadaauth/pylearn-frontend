"use client"
import { useEffect, useState } from "react";
import { Alert, Button, Form, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { remark } from "remark";
import html from 'remark-html';
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";



interface Module {
    key: string,
    title: string,
    projects: Project[],
}
interface Project {
    key: string,
    title: string,
}

export default function ProjectCreateForm() {
    const [mode, setMode] = useState("draft");
    const [modules, setModules] = useState<Module[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const router = useRouter();
    const [showError, setShowError] = useState(false);

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
        <div className="my-6 flex justify-center gap-4">
            <div className="flex flex-col gap-4 w-96">
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
                    <Textarea
                        name="markdown_content"
                        label="Project Content (in markdown)"
                    />
                    <div className="w-full flex flex-row justify-between items-center">
                        <Button onClick={() => setMode("draft")} className="bg-[#F94144] text-white" type="submit" isDisabled>Draft</Button>
                        <Button onClick={() => setMode("publish")} className="bg-[#2EC4B6] text-white" type="submit">Publish</Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}

async function fetchProjects(module_id: string) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_V1}/project/all?module_id=${module_id}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${Cookies.get("access_token")}`
            }
        })

        if (res.ok) {
            return (await res.json()).data.projects;
        } else return [];
    } catch(err) {
        return [];
    }
}

async function fetchModules() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_V1}/module`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${Cookies.get("access_token")}`
            }
        })

        if (res.ok) {
            let modules = (await res.json()).data.modules;

            for (let i = 0; i < modules.length; i++) {
                let projects = await fetchProjects(modules[i].id);
                modules[i].projects = projects;
            }
            console.log(modules);
            return modules;
        } else return [];
    } catch(err) {
        return [];
    }
}