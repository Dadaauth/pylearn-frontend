"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Alert, Button, Form, Input, Select, SelectItem, VisuallyHidden } from "@heroui/react";
import Cookies from "js-cookie";

import { ForwardRefEditor } from "@/components/utils/ForwardRefEditor";
import { PageData } from "./definitions";
import { fetchAPIv1 } from "@/utils/api";



export function ProjectCreateForm({ data }: { data: PageData}) {
    const router = useRouter();
    const [showError, setShowError] = useState(false);
    const [markdown_content, setMarkDownContent] = useState("");

    async function submitProjectCreateForm(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        if (data.prev_project_id == "")
            delete data.prev_project_id

        try {
            const course_id = Cookies.get("course_context");
            const res = await fetchAPIv1(`/admin/${course_id}/project/new`, undefined, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
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
                    onSubmit={submitProjectCreateForm}
                    validationBehavior="native"
                >
                    <div className="w-full flex flex-wrap flex-row justify-center gap-4">
                        <div className="flex flex-col gap-4 w-96">
                            <Select
                                className="max-w-md"
                                label="Module"
                                placeholder="Select a Module"
                                name="module_id"
                                isRequired
                            >
                                {data.modules.map((item) => {
                                    return <SelectItem key={item.id}>{item.title}</SelectItem>
                                })}
                            </Select>
                            <Select
                                className="max-w-md"
                                label="Prev Project"
                                placeholder="Select the previous project"
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
                                isRequired
                            />
                            <Input
                                type="text"
                                name="description"
                                label="Short Description"
                                maxLength={300}
                            />
                            <Input
                                type="number"
                                name="fa_duration"
                                label="First Attempt Duration"
                            />
                            <Input
                                type="number"
                                name="sa_duration"
                                label="Second Attempt Duration"
                            />
                            <Input
                                type="number"
                                name="release_range"
                                label="Release Range From Previous Project"
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
                    <Button className="bg-[#2EC4B6] text-white" type="submit">Publish</Button>
                </Form>
        </div>
    );
}