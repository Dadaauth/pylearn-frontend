"use client"
import { useEffect, useState } from "react";

import { remark } from "remark";
import html from 'remark-html';
import { Button } from "@nextui-org/react";
import { RemoveDone, DoneAll } from "@mui/icons-material";
import AppNavBar from "@/components/ui/navbar";

export default function Page() {
    const [projectCompleted, setProjectCompleted] = useState(false);
    const [markDownHTML, setMarkDownHTML] = useState("");
    useEffect(() => {
        async function getHTML() {
            const processedContent = await remark().use(html).process("#### Resources\n* [Python Basics](https://v1.tailwindcss.com/docs/typography-plugin)\n#### Tasks\n* Set up your development environment and make sure everything is working\n* Install Python on you rlocal machine\n* Install Python on your cloud machine\n* Write a simple \"Hello World!\" program in Python");
            setMarkDownHTML(processedContent.toString());
        }

        getHTML();
    }, [])

    // @ts-ignore
    function handleProjectStatusUpdate(e) {
        setProjectCompleted(!projectCompleted)  
    } 
    return (
        <>
            <AppNavBar />
            <div className="mx-6">
                <p>Welcome Clement,</p>
                <div className="my-6">
                    <h3 className="text-lg">Project Title: Python | Setting up {projectCompleted && <DoneAll color="success"/>}</h3>
                    <div className="my-4 max-[767px]:prose prose-lg dark:prose-invert" dangerouslySetInnerHTML={{ __html: markDownHTML }}/>
                    {projectCompleted ? <Button onPress={handleProjectStatusUpdate} color="success"> <RemoveDone color="error"/> Mark As Pending</Button>:
                    <Button onPress={handleProjectStatusUpdate} color="success"><DoneAll />Mark As Done</Button>}
                </div>
            </div>
        </>
    );
}