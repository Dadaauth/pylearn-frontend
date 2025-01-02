"use client"
import { useState } from "react";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { remark } from "remark";
import html from 'remark-html';

// @ts-expect-error This is just necessary
export default function Form({loading, title, description, markdown_content, module_id, prev_project_id}) {
    const [projectDetails, setProjectDetails] = useState({
        "title": title,
        "description": description,
        "markdown_content": markdown_content,
        "module_id": module_id,
        "prev_project_id": prev_project_id,
    })
    const [markdownContent, setMarkdownContent] = useState("");

    async function setMarkdownPreview(value: string) {
        // Convert MarkDown to HTML for preview
        const html_str = (await remark().use(html).process(value)).toString()
        setMarkdownContent(html_str);
    }

    // @ts-expect-error This is just necessary
    function handleInputChange(e) {
        if (e.target.name == "markdown_content") setMarkdownPreview(e.target.value);
        setProjectDetails((prevValue) => {
            return {
                ...prevValue,
                [e.target.name]: e.target.value
            }
        })
    }

    const modules = [
        {key: "1", title: "Introduction to Python"},
        {key: "2", title: "Code Version Control"},
        {key: "3", title: "DevOps & Deployment Strategies"},
        {key: "4", title: "Introduction to JavaScript"},
    ];

    const projects = [
        {key: "1", title: "Introduction to Python"},
        {key: "2", title: "Code Version Control"},
        {key: "3", title: "DevOps & Deployment Strategies"},
        {key: "4", title: "Introduction to JavaScript"},
    ]

    return (
        <div className="my-6 flex justify-center gap-4">
            <div className="flex flex-col gap-4 w-96">
                <Select
                    className="max-w-md"
                    items={modules}
                    label="Module"
                    placeholder="Select a Module"
                    // You need to add a selctValue atrribute for editing page
                    name="module_id"
                    isRequired
                    onChange={handleInputChange}
                >
                    {(module) => <SelectItem>{module.title}</SelectItem>}
                </Select>
                <Select
                    className="max-w-md"
                    items={projects}
                    label="Prev Project"
                    placeholder="Select the previous project"
                    // You need to add a selctValue atrribute for editing page
                    name="prev_project_id"
                    onChange={handleInputChange}
                >
                    {(module) => <SelectItem>{module.title}</SelectItem>}
                </Select>
                <Input
                    type="text"
                    name="title"
                    label="Project Title"
                    maxLength={300}
                    value={projectDetails.title}
                    required={true}
                    onChange={handleInputChange}
                />
                <Input
                    type="text"
                    name="description"
                    label="Short Description"
                    maxLength={300}
                    value={projectDetails.description}
                    required={true}
                    onChange={handleInputChange}
                />
                <div className="border-4 my-4 max-[767px]:prose prose-lg dark:prose-invert" dangerouslySetInnerHTML={{ __html: markdownContent }}/>
                <Textarea
                    name="markdown_content"
                    label="Project Content (in markdown)"
                    value={projectDetails.markdown_content}
                    required={true}
                    onChange={handleInputChange}
                />
                <div className="flex flex-row justify-between items-center">
                    <Button className="bg-[#F94144] text-white">Draft</Button>
                    <Button className="bg-[#2EC4B6] text-white">Publish</Button>
                </div>
            </div>
        </div>
    );
}