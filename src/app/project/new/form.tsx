"use client"
import { useEffect, useState } from "react";
import { Button, Input, Textarea } from "@nextui-org/react";
import { remark } from "remark";
import html from 'remark-html';

// @ts-expect-error This is just necessary
export default function Form({endpoint, method="POST", loading=false, title="", description="", content=""}) {
    const [projectDetails, setProjectDetails] = useState({
        "title": "",
        "description": "",
        "content": "",
    })
    const [markdownContent, setMarkdownContent] = useState("");

    useEffect(() => {
        if (!loading) {setProjectDetails({title, description, content})}
    }, [loading, content, description, title])

    async function setMarkdownPreview(value: string) {
        // Convert MarkDown to HTML for preview
        const html_str = (await remark().use(html).process(value)).toString()
        setMarkdownContent(html_str);
    }

    // @ts-expect-error This is just necessary
    function handleInputChange(e) {
        if (e.target.name == "content") setMarkdownPreview(e.target.value);
        setProjectDetails((prevValue) => {
            return {
                ...prevValue,
                [e.target.name]: e.target.value
            }
        })
    }

    function submitFormHandler() {submitForm(projectDetails, endpoint, method)}
    return (
        <div className="my-6 flex justify-center gap-4">
            <div className="flex flex-col gap-4 w-96">
                <Input
                    type="text"
                    name="title"
                    label="Project Title"
                    value={projectDetails.title}
                    required={true}
                    onChange={handleInputChange}
                />
                <Input
                    type="text"
                    name="description"
                    label="Short Description"
                    value={projectDetails.description}
                    required={true}
                    onChange={handleInputChange}
                />
                <div className="border-4 my-4 max-[767px]:prose prose-lg dark:prose-invert" dangerouslySetInnerHTML={{ __html: markdownContent }}/>
                <Textarea
                    name="content"
                    label="Project Content (in markdown)"
                    value={projectDetails.content}
                    required={true}
                    onChange={handleInputChange}
                />
                <Button onPress={submitFormHandler} color="warning">Submit</Button>
            </div>
        </div>
    );
}

// @ts-expect-error This is just necessary
async function submitForm(projectDetails, endpoint, method) {
    console.log(projectDetails);
    for (const detail in projectDetails) {
        if (projectDetails[detail] == "") return
    }
    try {
        const res = await fetch(endpoint, {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({...projectDetails}),
        });

        if (res.ok) console.log("Operation Successfull!");
        else console.log("Error occurred!!!");
    } catch (e) {
        console.log("Error occurred!!!", e);
    }
}