"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Form, Alert, Input, Select, SelectItem, VisuallyHidden } from "@heroui/react";

import { PageData } from "./definitions";
import { ForwardRefEditor } from "@/components/utils/ForwardRefEditor";
import { fetchAPIv1 } from "@/utils/api";

export default function ProjectEditForm({ data }: { data: PageData }) {
    const router = useRouter();
    const [showError, setShowError] = useState(false);
    const [markdownContent, setMarkDownContent] = useState(data.currentProject.markdown_content);


    async function submitProjectEditForm(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const formData = new FormData(form);
        const data_f = Object.fromEntries(formData.entries());
    
        if (data_f.prev_project_id == "")
            delete data_f.prev_project_id

        try {
            const res = await fetchAPIv1(`/admin/project/${data.currentProject.id}/edit`, undefined, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data_f)
            });

            if (res.ok) router.push("/admin/projects");
            else setShowError(true);
        } catch {
            setShowError(true);
        }
    }

    return (
        <div className="my-6">
            {showError &&
                <Alert
                    color="danger"
                    title="An Error Occured!"
                />
            }
            <Form
                onSubmit={submitProjectEditForm}
                validationBehavior="native"
            >
                <div className="w-full flex flex-wrap flex-row justify-center gap-4">
                    <div className="flex flex-col gap-4 w-96">
                        <Select
                            className="max-w-md"
                            label="Module"
                            placeholder="Select a Module"
                            name="module_id"
                            defaultSelectedKeys={[data.currentProject.module_id]}
                            isRequired
                        >
                            {data.modules.map((item) => {
                                return <SelectItem key={item.id}>{item.title}</SelectItem>
                            })}
                        </Select>
                        <Select
                            className="max-w-md"
                            label="Previous Project"
                            placeholder="Select the previous project"
                            defaultSelectedKeys={[data.currentProject.prev_project_id]}
                            name="prev_project_id"
                        >
                            {data.projects.map((project) => {
                                return <SelectItem key={project.id}>{`${project.title} - ${project.fa_duration + project.sa_duration} days long`}</SelectItem>
                            })}
                        </Select>
                        <Input
                            type="text"
                            name="title"
                            label="Project Title"
                            maxLength={300}
                            defaultValue={data.currentProject.title}
                            isRequired
                        />
                        <Input
                            type="text"
                            name="description"
                            label="Short Description"
                            defaultValue={data.currentProject.description}
                            maxLength={300}
                        />
                        <Input
                                type="number"
                                name="fa_duration"
                                label="First Attempt Duration"
                                defaultValue={`${data.currentProject.fa_duration}`}
                            />
                        <Input
                            type="number"
                            name="sa_duration"
                            label="Second Attempt Duration"
                            defaultValue={`${data.currentProject.sa_duration}`}
                        />
                        <Input
                            type="number"
                            name="release_range"
                            label="Release Range From Previous Project"
                            defaultValue={`${data.currentProject.release_range}`}
                        />
                        <VisuallyHidden>
                            <Input
                                name="markdown_content"
                                value={markdownContent}
                                hidden
                            />
                        </VisuallyHidden>
                    </div>
                    <ForwardRefEditor
                        onChange={setMarkDownContent}
                        markdown={markdownContent}
                        contentEditableClassName="border-black rounded-md border-b-1"
                        placeholder="insert markdown content here"
                    />
                    <Button className="bg-[#2EC4B6] text-white" type="submit">Publish</Button>
                </div>
            </Form>
        </div>
    );
}