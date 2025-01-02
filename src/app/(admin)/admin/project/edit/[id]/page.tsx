"use client"
import { useEffect, useState } from "react";
import AppNavBar from "@/components/ui/navbar";
import Form from "./form";
import ProtectedAdmin from "@/components/utils/ProtectedAdmin";
import WelcomeSection from "@/components/ui/welcomeSection";

export default function Page({
    params,
  }: {
    params: Promise<{ id: string }>
  }) {
    const [project, setProject] = useState({
        title: "",
        description: "",
        markdown_content: "",
        module_id: "",
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
                <WelcomeSection />
                <div className="mx-6">
                    <h3 className="font-bold text-[#3776AB] text-lg">Edit a Project</h3>
                    <Form
                        loading={loading}
                        title={project.title}
                        description={project.description}
                        markdown_content={project.markdown_content}
                        module_id={project.module_id}
                        prev_project_id=""
                    />
                </div>
            </ProtectedAdmin>
        </>
    );
}