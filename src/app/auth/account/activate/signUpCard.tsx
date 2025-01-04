"use client"
import { useState } from "react";
import { Input, Card, CardHeader, CardBody, CardFooter, Button, Form, Alert } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function SignUpCard() {
    const [error, setError] = useState(false);
    const router = useRouter();

    async function submitForm(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_V1}/student/account/activate`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
    
            if (res.ok) {
                router.push("/auth/login");
            } else {
                console.error("An error occured");
                setError(true);
            }
        } catch (err) {
            console.error("An error occured");
            setError(true);
        }
        
    }
    return (
        <div className="flex justify-center items-center">
            <Card className="w-96">
                <CardHeader>
                    <p>Student Account Activation</p>
                </CardHeader>
                <CardBody className="flex flex-col gap-5">
                    {error &&
                        <Alert
                            color="danger"
                            title="An Error Occurred!"
                        />
                    }
                    <Form
                        onSubmit={submitForm}
                        validationBehavior="native"
                    >
                        <Input
                            type="text"
                            name="registration_number"
                            label="Registration Number"
                            placeholder="Registration Number sent to your email e.g. 2025/C1/0001"
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
                            label="Phone Number"
                            isRequired
                        />
                        <Input
                            type="password"
                            name="password"
                            label="Password"
                            isRequired
                        />
                        <Button className="self-end bg-[#3776AB] text-white" type="submit">Activate Account</Button>
                    </Form>
                </CardBody>
            </Card>
        </div>
    );
}