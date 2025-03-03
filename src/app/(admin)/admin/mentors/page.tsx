"use client"
import { useState, useEffect } from "react";
import { Button, useDisclosure } from "@heroui/react";

import AppNavBar from "@/components/ui/navbar";
import ProtectedAdmin from "@/components/utils/ProtectedAdmin";
import { MentorAdd_Modal } from "./modals";
import { MentorsTable } from "./tables";
import { fetchData } from "./utils";
import LoadingPage from "@/components/ui/loadingPage";
import { PageData } from "./definitions";


export default function Page() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [data, setData] = useState<PageData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData().then((result) => {
            setData(result);
            console.log(result);
            setLoading(false);
        })
    }, [])

    if (loading) return <LoadingPage />
    if (!data) return <p>Page load failed</p>

    return (
        <ProtectedAdmin>
            <AppNavBar />
            <div className="mx-6">
                <Button onPress={onOpen} className="text-white bg-[#3776AB]">Add Mentor</Button>
                <MentorsTable data={data}/>
            </div>
            <MentorAdd_Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
            />
        </ProtectedAdmin>
    );
}