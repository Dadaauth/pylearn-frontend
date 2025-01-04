"use client"
import { useState } from "react";
import { Button, Form, Input, Alert, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem } from "@nextui-org/react";
import Cookies from "js-cookie";

export function ModuleEditModal({ isOpen, onOpenChange, toEdit }: {
    isOpen: boolean,
    onOpenChange: (isOpen: boolean) => void,
    toEdit: { id: string, title: string, status: string, description: string }
}) {
    const [isLoading, setIsLoading] = useState(false);
    const [info, setInfo] = useState({
        status: "",
        message: ""
    });

    async function handleEditModuleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);
        const form = e.currentTarget as HTMLFormElement;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            // Update data on the backend
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_V1}/project/module/${toEdit.id}/update`, {
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${Cookies.get("access_token")}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            });

            if (res.ok) {
                setInfo({"status": "success", "message": "Module Update Successful!"});
            } else {
                setInfo({"status": "fail", "message": "An Error Occured!"});
            }
        } catch (err) {
            setInfo({"status": "fail", "message": "An Error Occured!"});
        } finally {
            setIsLoading(false);
        }
    }



    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader>
                            Editing Module - {toEdit.title}
                        </ModalHeader>
                        <ModalBody>
                            {info.message != "" &&
                                <Alert
                                    type={info.status}
                                    color={info.status === "success" ? "success" : "danger"}
                                    title={info.message}
                                />
                            }
                            <Form
                                onSubmit={handleEditModuleSubmit}
                                validationBehavior="native"
                            >
                                <Input
                                    name="title"
                                    defaultValue={toEdit.title}
                                    label="Title"
                                    maxLength={60}
                                />
                                <Input
                                    name="description"
                                    defaultValue={toEdit.description}
                                    label="Description"
                                    maxLength={300}
                                />
                                <Select
                                    name="status"
                                    label="Status"
                                    defaultSelectedKeys={[toEdit.status]}
                                >
                                    <SelectItem key="draft">Draft</SelectItem>
                                    <SelectItem key="published">Published</SelectItem>
                                </Select>
                                <Button
                                    className="self-end bg-[#3776AB] text-white"
                                    type="submit"
                                    isLoading={isLoading}
                                >Update</Button>
                            </Form>
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}

export function DeleteModal({ isOpen, onOpenChange, toDelete }: {
    isOpen: boolean,
    onOpenChange: (isOpen: boolean) => void,
    toDelete: { type: string, id: string, title: string }
}) {
    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
        >
            <ModalContent>
                {(onClose) => (
                    <>                    
                        <ModalHeader>
                            Delete {toDelete.type} - {toDelete.title}?
                        </ModalHeader>
                        <ModalBody>
                            <p>
                                Are you sure you want to delete {toDelete.type} - {toDelete.title}?
                            </p>
                            <p>
                                To proceed, please enter [{toDelete.id}] below:
                            </p>
                        </ModalBody>
                        <ModalFooter>
                            <div className="w-full flex flex-row gap-3 items-center">
                                <Input
                                    type="text"
                                    label={`${toDelete.type} ID`}
                                    name="ID"
                                />
                                <Button>Submit</Button>
                            </div>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}