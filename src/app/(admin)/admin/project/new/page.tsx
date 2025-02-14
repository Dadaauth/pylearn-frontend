"use client"

import AppNavBar from "@/components/ui/navbar";
import { ProjectCreateForm } from "./forms";
import ProtectedAdmin from "@/components/utils/ProtectedAdmin";

import '@mdxeditor/editor/style.css'

export default function Page() {
    return (
        <>
            <AppNavBar />
            <ProtectedAdmin>
                <div className="mx-6">
                    <h3 className="font-bold text-[#3776AB] text-lg">New Project</h3>
                    <ProjectCreateForm />
                </div>
            </ProtectedAdmin>
        </>
    );
}