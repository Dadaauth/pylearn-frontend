"use client"
import { useEffect, useState } from "react";

import { fetchCourses } from "./utils";
import { Alert, Button } from "@heroui/react";

interface Course {
    id: string,
    title: string,
}

export default function Page() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [info, setInfo] = useState({message: "", status: ""})
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
            setCourses(await fetchCourses());
        }

        fetchData();
    }, []);


    async function submitForm(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);
        const form = e.currentTarget as HTMLFormElement;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_V1}/student/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                setInfo({status: 'success', message: "You have successfully applied!"})
            } else {
                setInfo({status: 'fail', message: `An error occurred! \n
                    If it persists, please contact us at ${process.env.NEXT_PUBLIC_SUPPORT_EMAIL}`})
            }
        } catch {
            setInfo({status: 'fail', message: `An error occurred! \n
                If it persists, please contact us at ${process.env.NEXT_PUBLIC_SUPPORT_EMAIL}`})
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <>
            <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
                <header className="w-full bg-blue-600 text-white py-4 shadow-md px-4">
                    <div className="container mx-auto flex justify-between items-center">
                        <h1 className="text-3xl font-bold">Pylearn</h1>
                        <nav>
                            <ul className="flex space-x-4">
                                <li><a href={`${[process.env.NEXT_PUBLIC_LANDING_PAGE_DOMAIN]}`} className="hover:underline">Home</a></li>
                                <li><a href={`${[process.env.NEXT_PUBLIC_LANDING_PAGE_DOMAIN]}/courses`} className="hover:underline">Courses</a></li>
                                <li><a href={`${process.env.NEXT_PUBLIC_INTRANET_DOMAIN}/auth/login`} className="hover:underline">Login</a></li>
                                <li><a href={`${[process.env.NEXT_PUBLIC_LANDING_PAGE_DOMAIN]}/about`} className="hover:underline">About</a></li>
                                <li><a href={`${[process.env.NEXT_PUBLIC_LANDING_PAGE_DOMAIN]}/contact`} className="hover:underline">Contact</a></li>
                            </ul>
                        </nav>
                    </div>
                </header>
                <main className="flex-grow container mx-auto py-16 px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-4">Apply to Learn a Tech Skill</h2>
                        <p className="text-lg text-gray-700">Fill in the form below to apply for our tech program</p>
                    </div>
                    <form onSubmit={submitForm} className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
                        {info.message != "" &&
                            <Alert
                                color={info.status === "success" ? "success" : "danger"}
                                title={info.message}
                            />
                        }
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="first_name">First Name</label>
                            <input name="first_name" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="first_name" type="text" placeholder="First Name" required/>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="last_name">Last Name</label>
                            <input name="last_name" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="last_name" type="text" placeholder="Last Name" required/>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                            <input name="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email" required/>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Username</label>
                            <input name="username" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" required/>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                            <input name="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Password" required/>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">Phone</label>
                            <input name="phone" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="phone" type="tel" placeholder="Phone" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="course">Course</label>
                            <select name="course_id" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="course" required>
                                {courses.map((course, idx) => {
                                    return <option key={idx} value={course.id}>{course.title}</option>
                                })}
                            </select>
                        </div>
                        <div className="flex items-center justify-between">
                            <Button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700" isLoading={isLoading} type="submit">Submit</Button>
                        </div>
                    </form>
                </main>
                <footer className="w-full bg-blue-600 text-white py-4">
                    <div className="container mx-auto text-center">
                        <p>&copy; {new Date().getFullYear()} Pylearn. All rights reserved.</p>
                    </div>
                </footer>
            </div>
        </>
    );
}