"use client"
import { Button, useDisclosure } from "@nextui-org/react";

import AppNavBar from "@/components/ui/navbar";
import ProtectedAdmin from "@/components/utils/ProtectedAdmin";
import { MentorAdd_Modal } from "./modals";


export default function Page() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    return (
        <ProtectedAdmin>
            <AppNavBar />
            <div className="mx-6">
                <Button onPress={onOpen} className="text-white bg-[#3776AB]">Add Mentor</Button>
            </div>
            <MentorAdd_Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
            />
        </ProtectedAdmin>
    );
}