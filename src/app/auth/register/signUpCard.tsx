"use client"
import { useState } from "react";
import { Input, Card, CardHeader, CardBody, CardFooter, Button, Form } from "@nextui-org/react";

export default function SignUpCard() {
    const [formDetails, setFormDetails] = useState({
        "email": "",
        "password": "",
        "first_name": "",
        "last_name": "",
    })

    // @ts-expect-error This is a React ChangeEvent
    function handleInputChange(e) {
        setFormDetails((prevValue) => {
            return {
                ...prevValue,
                [e.target.name]: e.target.value
            }
        })
    }
    type Details = "email" | "password" | "first_name" | "last_name"
    async function submitForm() {
        console.log(formDetails);
        let detail: Details
        for (detail in formDetails) {
            if (formDetails[detail] == "") return
        }
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_V1}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({...formDetails, "role": "student"}),
            });
    
            if (res.ok) {
                console.log("Registration Successful");
            } else console.log("Error occurred!!!");

            console.log(await res.json());
        } catch (e) {
            console.log("Error occurred!!!", e);
        }
    }
    return (
        <div className="flex justify-center items-center">
            <Card className="w-96">
                <CardHeader>
                    <p>Student Sign Up</p>
                </CardHeader>
                <CardBody className="flex flex-col gap-5">
                    <Form>
                        <Input
                            type="text"
                            name="registration_number"
                            label="Registration Number"
                            placeholder="Registration Number sent to your email e.g. 2018/123456"
                            onChange={handleInputChange}
                            isRequired
                        />
                        <Input
                            type="text"
                            name="username"
                            label="Username:"
                            onChange={handleInputChange}
                            isRequired
                        />
                        <Input
                            type="text"
                            name="phone"
                            label="Phone Number"
                            onChange={handleInputChange}
                            isRequired
                        />
                        <Input
                            type="password"
                            name="password"
                            label="Password"
                            onChange={handleInputChange}
                            isRequired
                        />
                        <Button className="self-end bg-[#3776AB] text-white" type="submit">Sign Up</Button>
                    </Form>
                </CardBody>
            </Card>
        </div>
    );
}