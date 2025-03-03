"use client"
import { useState, useEffect } from "react";

import AppNavBar from "@/components/ui/navbar";
import { ProjectCreateForm } from "./forms";
import ProtectedAdmin from "@/components/utils/ProtectedAdmin";

import '@mdxeditor/editor/style.css'
import LoadingPage from "@/components/ui/loadingPage";
import { fetchData } from "./utils";
import { PageData } from "./definitions";

export default function Page() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<PageData | null>(null)

    useEffect(() => {
        fetchData().then((result) => {
            setData(result);
            setLoading(false);
        })
    }, []);

    if (loading) return <LoadingPage />
    if (!data) return <p>Data Fetch Unsuccessful!</p>
    return (
        <>
            <AppNavBar />
            <ProtectedAdmin>
                <div className="mx-6">
                    <h3 className="font-bold text-[#3776AB] text-lg">New Project</h3>
                    <ProjectCreateForm data={data} />
                </div>
            </ProtectedAdmin>
        </>
    );
}