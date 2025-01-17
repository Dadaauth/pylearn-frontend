"use client"
import AppNavBar from "@/components/ui/navbar";
import ProjectCreateForm from "./form";
import ProtectedAdmin from "@/components/utils/ProtectedAdmin";
import WelcomeSection from "@/components/ui/welcomeSection";
import { Alert, Button, Form, Input, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/react";
import Cookies from "js-cookie";
import { useState } from "react";

export default function Page() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    return (
        <>
            <AppNavBar />
            <ProtectedAdmin>
                <WelcomeSection />
                <div className="mx-6">
                    <Button size="sm" onPress={onOpen} className="mb-5 bg-[#3776AB] text-white">Create New Module</Button>
                    <h3 className="font-bold text-[#3776AB] text-lg">Create a new Project</h3>
                    <ProjectCreateForm />
                </div>
                <CreateModuleModal
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                />
            </ProtectedAdmin>
        </>
    );
}

interface CreateModuleModalProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
}

function CreateModuleModal({isOpen, onOpenChange}: CreateModuleModalProps) {
    const [info, setInfo] = useState({
        status: "",
        message: ""
    });
    const [isLoading, setIsLoading] = useState(false);

    async function submitForm(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);
        const form = e.currentTarget as HTMLFormElement;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_V1}/module/create`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${Cookies.get("access_token")}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (res.ok) {
                setInfo({status: "success", message: "Module Created Successfully!"});
            }
        } catch (err) {
            setInfo({status: "fail", message: "An Error Occured!"});
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>Create a new Module</ModalHeader>
                            <ModalBody>
                                {info.message != "" &&
                                    <Alert
                                        type={info.status}
                                        color={info.status === "success" ? "success" : "danger"}
                                        title={info.message}
                                    />
                                }
                                <Form
                                    onSubmit={submitForm}
                                    validationBehavior="native"
                                >
                                    <Input
                                        name="title"
                                        label="Module Title"
                                        placeholder="Max 60 characters"
                                        maxLength={60}
                                        isRequired
                                    />
                                    <Input
                                        name="description"
                                        label="Module Description"
                                        placeholder="Max 300 characters"
                                        maxLength={300}
                                    />
                                    <Button isLoading={isLoading} className="self-end bg-[#3776AB] text-white" type="submit">Submit</Button>
                                </Form>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}