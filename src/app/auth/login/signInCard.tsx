"use client"
import { useState } from "react";
import { Input, Card, CardHeader, CardBody, CardFooter, Button } from "@nextui-org/react";

import { signIn } from "@/utils/auth";

export default function SignInCard() {
    const [formDetails, setFormDetails] = useState({
        "email": "",
        "password": "",
        "role": "",
    });

    // @ts-expect-error This is a React ChangeEvent
    function handleInputChange(e) {
        setFormDetails((prevValue) => {
            return {
                ...prevValue,
                [e.target.name]: e.target.value
            }
        })
    }
    type Details = "email" | "password" | "role"

    async function submitForm() {
        let detail: Details
        for (detail in formDetails) {
            if (formDetails[detail] == "") return
        }
        await signIn(formDetails);
    }

    return (
        <div className="flex justify-center items-center">
            <Card className="w-96">
                <CardHeader>
                    <p>Sign In</p>
                </CardHeader>
                <CardBody className="flex flex-col gap-5">
                    <Input
                        type="email"
                        name="email"
                        label="Email:"
                        onChange={handleInputChange}
                    />
                    <Input
                        type="password"
                        name="password"
                        label="Password"
                        onChange={handleInputChange}
                    />
                    <Input
                        type="radio"
                        name="role"
                        value="student"
                        label="Student"
                        onChange={handleInputChange}
                    />
                    <Input
                        type="radio"
                        name="role"
                        value="admin"
                        label="Admin"
                        onChange={handleInputChange}
                    />
                </CardBody>
                <CardFooter className="flex justify-end">
                    <Button onPress={submitForm} color="warning">Submit</Button>
                </CardFooter>
            </Card>
        </div>
    );
}