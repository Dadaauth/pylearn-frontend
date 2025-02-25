"use client"
import { Input, Card, CardHeader, CardBody, CardFooter, Button, Form, Select, SelectItem, Alert } from "@heroui/react";

import { signIn } from "@/utils/auth";
import { useState } from "react";

export default function SignInCard() {
    const [info, setInfo] = useState({
        status: "",
        message: ""
    });

    async function submitForm(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const data = {
            username: formData.get("username") as string,
            password: formData.get("password") as string,
            role: formData.get("role") as string,
        };
        const res = await signIn(data);
        if (!res) setInfo({status: "fail", message: "An error occured!"});
    }

    return (
        <div className="flex justify-center items-center">
            <Card className="w-96">
                <CardHeader>
                    <p>Sign In</p>
                </CardHeader>
                <CardBody className="flex flex-col gap-5">
                    {info.message != "" &&
                        <Alert
                            color={info.status === "success" ? "success" : "danger"}
                            title={info.message}
                        />
                    }
                    <Form onSubmit={submitForm} validationBehavior="native">
                        <Input
                            type="text"
                            name="username"
                            label="Username:"
                            isRequired
                        />
                        <Input
                            type="password"
                            name="password"
                            label="Password"
                            isRequired
                        />
                        <Select
                            className="max-w-md"
                            label="Role"
                            placeholder="Select your Role"
                            name="role"
                            isRequired
                        >
                            <SelectItem key="student">Student</SelectItem>
                            <SelectItem key="mentor">Mentor</SelectItem>
                            <SelectItem key="admin">Admin</SelectItem>
                        </Select>
                        <Button type="submit" className="self-end bg-[#3776AB] text-white">Submit</Button>
                    </Form>
                </CardBody>
            </Card>
        </div>
    );
}