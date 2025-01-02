"use client"
import { useState } from "react";
import { Input, Card, CardHeader, CardBody, CardFooter, Button, Form, Alert } from "@nextui-org/react";

export default function SignUpCard() {
    const [info, setInfo] = useState({
        status: "",
        message: ""
    });

    async function submitForm(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        data["role"] = "admin";
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_V1}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })

        if (res.ok) {
            setInfo({status: "success", message: "Sign Up Successful!"});
            console.log("Sign Up Successful!");
        } else {
            console.error("An error occured");
            setInfo({status: "fail", message: "An error occured!"});
            console.log(await res.json());
        }

    }

    return (
        <div className="flex justify-center items-center">
            <Card className="w-96">
                <CardHeader>
                    <p>Admin Sign Up</p>
                </CardHeader>
                <CardBody className="flex flex-col gap-5">
                    {info.message != "" &&
                    <Alert
                        type={info.status}
                        color={info.status === "success" ? "success" : "danger"}
                        title={info.message}
                    />}
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
                        <Input
                            type="text"
                            name="username"
                            label="Username"
                            isRequired
                        />
                        <Input
                            type="text"
                            name="phone"
                            label="Phone"
                            isRequired
                        />
                        <Input
                            type="password"
                            name="password"
                            label="Password"
                            isRequired
                        />
                        <Input
                            type="password"
                            name="admin_reg_code"
                            label="Admin Registration Code"
                            isRequired
                        />
                        <Button className="self-end bg-[#3776AB] text-white" type="submit">Sign Up</Button>
                    </Form>
                </CardBody>
            </Card>
        </div>
    );
}