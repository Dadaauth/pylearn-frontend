"use client"
import { useEffect, useState } from "react";

import { remark } from "remark";
import html from 'remark-html';
import { Button } from "@nextui-org/react";
import { DoneAll } from "@mui/icons-material";
import AppNavBar from "@/components/ui/navbar";
import ProtectedRoute from "@/components/utils/protected";
import { MarkProjectAsCompleted } from "@/utils/project";
import { RetrieveProjectsStatuses } from "@/utils/project";

export default function Page({
    params,
  }: {
    params: Promise<{ id: string }>
  }) {
    const [project, setProject] = useState({
        "title": "",
        "content": "",
    });
    const [projectCompleted, setProjectCompleted] = useState(false);
    const [markDownHTML, setMarkDownHTML] = useState("");
    useEffect(() => {
        async function getProjectDetails() {
            const p_id = (await params).id

            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_V1}/project/fetch/single?q=title,content&id=${p_id}`)

                if (res.ok) {
                    const project = (await res.json()).data.project;
                    const processedContent = await remark().use(html).process(project.content);
                    setMarkDownHTML(processedContent.toString());
                    setProject(project);
                } else {
                    console.log("An error occured!");
                }
            } catch (e) {
                console.error("An error occured!", e);
            }
        }

        async function VerifyProjectStatus() {
            const p_id = (await params).id
            let status = await RetrieveProjectsStatuses([p_id]);
            if (status.length == 0) return;

            status = status[0];
            if (status.status == "completed") setProjectCompleted(true);
        }

        VerifyProjectStatus();
        getProjectDetails();
    }, [params]);

    async function MarkProjectAsCompletedWrapper() {
        const p_id = (await params).id
        if (await MarkProjectAsCompleted(p_id))
            setProjectCompleted(true);
    }

    return (
        <>
            <AppNavBar />
            <ProtectedRoute>
                <div className="mx-6">
                    <div className="my-6">
                        <h3 className="text-lg">Project Title: {project.title} {projectCompleted && <DoneAll color="success"/>}</h3>
                        <div className="my-4 max-[767px]:prose prose-lg dark:prose-invert" dangerouslySetInnerHTML={{ __html: markDownHTML }}/>
                        {projectCompleted ? <Button color="success" isDisabled={true}><DoneAll />Completed</Button>:
                        <Button onPress={MarkProjectAsCompletedWrapper} color="success">Mark Completed</Button>}
                    </div>
                </div>
            </ProtectedRoute>
        </>
    );
}