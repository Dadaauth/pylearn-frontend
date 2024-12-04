"use client"
import { useEffect, useState } from "react";
import AppNavBar from "@/components/ui/navbar";
import Form from "../../new/form";
import ProtectedAdmin from "@/components/utils/ProtectedAdmin";

export default function Page({
    params,
  }: {
    params: Promise<{ id: string }>
  }) {
    const [project, setProject] = useState({
        title: "",
        description: "",
        content: "",
    });
    const [p_id, set_pid] = useState("");
    const [loading, setIsLoading] = useState(true);
    useEffect(() => {
        async function getProjectDetails() {
            set_pid((await params).id)
            if (p_id == "") return

            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_V1}/project/fetch/single?q=title,description,content&id=${p_id}`)

                if (res.ok) {
                    const pjt = (await res.json()).data.project;
                    setProject(pjt);
                    setIsLoading(false);
                } else {
                    console.log("An error occured!");
                }
            } catch (e) {
                console.log("An error occured!", e);
            }
        }
        getProjectDetails();
    }, [p_id, params]);
    return (
        <>
            <AppNavBar />
            <ProtectedAdmin>
                <div className="mx-6">
                    <h3>Edit a Project</h3>
                    <Form
                        endpoint={`${process.env.NEXT_PUBLIC_API_URL_V1}/project/edit/${p_id}`}
                        method="PATCH"
                        loading={loading}
                        title={project.title}
                        description={project.description}
                        content={project.content}
                    />
                </div>
            </ProtectedAdmin>
        </>
    );
}