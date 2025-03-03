"use client"
import { useEffect, useState } from "react";
import AppNavBar from "@/components/ui/navbar";
import ProjectEditForm from "./form";
import ProtectedAdmin from "@/components/utils/ProtectedAdmin";
import { fetchData } from "./utils";
import LoadingPage from "@/components/ui/loadingPage";
import { PageData } from "./definitions";

export default function Page({
    params,
  }: {
    params: Promise<{ id: string }>
  }) {
    const [data, setData] = useState<PageData | null>(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetchData(params).then((result) => {
            setData(result);
            setLoading(false);
        })
    }, [params]);

    if (loading) return <LoadingPage />
    if (!data) return <p>Error loading page!</p>
    return (
        <>
            <AppNavBar />
            <ProtectedAdmin>
                <div className="mx-6">
                    <h3 className="font-bold text-[#3776AB] text-lg">Edit Project</h3>
                    <ProjectEditForm
                        data={data}
                    />
                </div>
            </ProtectedAdmin>
        </>
    );
}