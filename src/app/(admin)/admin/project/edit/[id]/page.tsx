"use client"
import { useEffect, useState } from "react";
import AppNavBar from "@/components/ui/navbar";
import ProjectEditForm from "./form";
import ProtectedAdmin from "@/components/utils/ProtectedAdmin";
import WelcomeSection from "@/components/ui/welcomeSection";

export default function Page({
    params,
  }: {
    params: Promise<{ id: string }>
  }) {
    const [project_id, set_pid] = useState("");
    const [loading, setIsLoading] = useState(true);
    useEffect(() => {
        async function getProjectDetails() {
            if (!loading) return;
            set_pid((await params).id)
            setIsLoading(false);
        }
        getProjectDetails();
    }, [project_id]);
    return (
        <>
            <AppNavBar />
            <ProtectedAdmin>
                <div className="mx-6">
                    <h3 className="font-bold text-[#3776AB] text-lg">Edit Project</h3>
                    {!loading &&
                    <ProjectEditForm
                        project_id={project_id}
                    />
                    }
                </div>
            </ProtectedAdmin>
        </>
    );
}