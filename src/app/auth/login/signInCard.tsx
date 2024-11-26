"use client"
import { useState } from "react";
import { Input, Card, CardHeader, CardBody, CardFooter, Button } from "@nextui-org/react";
import Cookies from "js-cookies";

export default function SignInCard() {
    const [formDetails, setFormDetails] = useState({
        "email": "",
        "password": "",
        "role": "",
    })

    // @ts-ignore
    function handleInputChange(e) {
        setFormDetails((prevValue) => {
            return {
                ...prevValue,
                [e.target.name]: e.target.value
            }
        })
    }
    type Details = "email" | "password" | "role"
    // @ts-ignore
    async function submitForm(e) {
        console.log(formDetails);
        let detail: Details
        for (detail in formDetails) {
            if (formDetails[detail] == "") return
        }
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_V1}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({...formDetails}),
            });
    
            if (res.ok) {
                console.log("Login Successful");
                // Store tokens and role in cookie
                let data = (await res.json()).data
                for (let key in data) {
                    // TODO: There is a problem when setting the cookie here. !!!!!
                    // The cookie only sets for the /auth path. It is not available on any other path
                    Cookies.setItem(key, data[key])
                }
            } else console.log("Error occurred!!!");
        } catch (e) {
            console.log("Error occurred!!!");
        }
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