"use client"
import { useState } from "react";

import Cookies from "js-cookie";

import { Alert, Button, Form, Input, Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import { CreateMentorModalProps } from "./definitions";


export function MentorAdd_Modal({isOpen, onOpenChange}: CreateMentorModalProps) {
    const [info, setInfo] = useState({status: "", message: ""});
    const [isLoading, setIsLoading] = useState(false);

    async function submitForm(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);
        const form = e.currentTarget as HTMLFormElement;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        data["role"] = "mentor";
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_V1}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Cookies.get("access_token")}`
                },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                setInfo({status: "success", message: "Account Creation Successful!"});
            } else {
                setInfo({status: "fail", message: "An error occured!"});
            }
        } catch(err) {
            setInfo({status: "fail", message: "An error occured!"});
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader>Add Mentor</ModalHeader>
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
                                    type="email"
                                    name="email"
                                    label="Email:"
                                    isRequired
                                />
                                <Input
                                    type="text"
                                    name="first_name"
                                    label="First Name"
                                    isRequired
                                />
                                <Input
                                    type="text"
                                    name="last_name"
                                    label="Last Name"
                                    isRequired
                                />
                                <Button isLoading={isLoading} className="self-end bg-[#3776AB] text-white" type="submit">
                                    Add Mentor
                                </Button>
                            </Form>
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}