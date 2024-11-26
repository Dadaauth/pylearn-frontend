"use client"
import { useState } from "react";
import { Button, Input, Textarea } from "@nextui-org/react";
import { remark } from "remark";
import html from 'remark-html';

export default function Form() {
    const [projectDetails, setProjectDetails] = useState({
        "title": "",
        "description": "",
        "content": "",
    })
    const [markdownContent, setMarkdownContent] = useState("");

    async function setMarkdownPreview(value: String) {
        // Convert MarkDown to HTML for preview
        // @ts-ignore
        let html_str = (await remark().use(html).process(value)).toString()
        setMarkdownContent(html_str);
    }

    // @ts-ignore
    function handleInputChange(e) {
        if (e.target.name == "content") setMarkdownPreview(e.target.value);
        setProjectDetails((prevValue) => {
            return {
                ...prevValue,
                [e.target.name]: e.target.value
            }
        })
    }

    function submitFormHandler() {submitForm(projectDetails)}
    return (
        <div className="my-6 flex justify-center gap-4">
            <div className="flex flex-col gap-4 w-96">
                <Input
                    type="text"
                    name="title"
                    label="Project Title"
                    required={true}
                    onChange={handleInputChange}
                />
                <Input
                    type="text"
                    name="description"
                    label="Short Description"
                    required={true}
                    onChange={handleInputChange}
                />
                <div className="border-4 my-4 max-[767px]:prose prose-lg dark:prose-invert" dangerouslySetInnerHTML={{ __html: markdownContent }}/>
                <Textarea
                    name="content"
                    label="Project Content (in markdown)"
                    required={true}
                    onChange={handleInputChange}
                />
                <Button onPress={submitFormHandler} color="warning">Submit</Button>
            </div>
        </div>
    );
}

// @ts-ignore
async function submitForm(projectDetails) {
    console.log(projectDetails);
    for (let detail in projectDetails) {
        if (projectDetails[detail] == "") return
    }
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_V1}/project/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({...projectDetails}),
        });

        if (res.ok && res.status == 201) console.log("Project Added Successfully!");
        else console.log("Error occurred!!!");
    } catch (e) {
        console.log("Error occurred!!!");
    }
}