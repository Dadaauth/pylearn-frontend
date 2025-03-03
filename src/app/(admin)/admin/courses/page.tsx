"use client"
import Cookies from "js-cookie";
import { Alert, Button, Chip, Form, Input, Link, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@heroui/react";
import { Accordion, AccordionItem } from "@heroui/react";

import AppNavBar from "@/components/ui/navbar";
import ProtectedAdmin from "@/components/utils/ProtectedAdmin";
import { useEffect, useState } from "react";
import { fetchCourses } from "./utils";
import { Course } from "./definitions";

export default function Page() {
    return (
        <ProtectedAdmin>
            <AppNavBar />
            <div className="mx-6">
                <AddCourse />
                <CoursesAccordion />
            </div>
        </ProtectedAdmin>
    );
}

function AddCourse() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [info, setInfo] = useState({status: "", message: ""});
    const [isLoading, setIsLoading] = useState(false);

    async function submitForm(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);
        const form = e.currentTarget as HTMLFormElement;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_V1}/course/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Cookies.get("access_token")}`
                },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                setInfo({status: "success", message: "Course Creation Successful!"});
            } else {
                setInfo({status: "fail", message: "An error occured!"});
            }
        } catch {
            setInfo({status: "fail", message: "An error occured!"});
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <>
            <Button onPress={onOpen} className="text-white bg-[#3776AB]">Add Course</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader>Add Course</ModalHeader>
                            <ModalBody>
                                {info.message != "" &&
                                    <Alert
                                        color={info.status === "success" ? "success" : "danger"}
                                        title={info.message}
                                    />
                                }
                                <Form
                                    onSubmit={submitForm}
                                    validationBehavior="native"
                                >
                                    <Input
                                        type="text"
                                        name="title"
                                        label="Title:"
                                        isRequired
                                    />
                                    <Button isLoading={isLoading} className="self-end bg-[#3776AB] text-white" type="submit">
                                        Add Course
                                    </Button>
                                </Form>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

function CoursesAccordion() {
    const [courses, setCourses] = useState<Course[]>([]);

    useEffect(() => {
        fetchCourses().then((result) => {setCourses(result)});
    }, [])

    return (
        <div className="max-w-lg">
            <Accordion>
                {courses.map((course, index) => {
                    return (
                        <AccordionItem key={index} title={course.title}>
                            <div className="flex flex-col gap-3">
                                    <div className="flex flex-row gap-4">
                                        <EditCourse course={course} />
                                        <AddCohort course_id={course.id} />
                                    </div>
                                    {course.cohorts.map((cohort, idx) => {
                                        return (
                                            <Link key={idx} href={`/admin/cohort/${cohort.id}`} className="flex flex-row justify-between">
                                                <span>{cohort.name}</span>
                                                <Chip color="success" className="text-white">{cohort.students} Student (s)</Chip>
                                            </Link>
                                        );
                                    })}
                            </div>
                        </AccordionItem>
                    );
                })}
            </Accordion>
        </div>
    );
}

function EditCourse({course}: {course: Course}) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [info, setInfo] = useState({status: "", message: ""});
    const [isLoading, setIsLoading] = useState(false);

    async function submitForm(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);
        const form = e.currentTarget as HTMLFormElement;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_V1}/course/${course.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Cookies.get("access_token")}`
                },
                body: JSON.stringify(data),
            });

            if (res.ok) setInfo({status: "success", message: "Data Update Successful!"});
            else setInfo({status: "fail", message: "An error occured!"});
        } catch {
            setInfo({status: "fail", message: "An error occured!"});
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <>
            <Button onPress={onOpen} size="sm" className="text-white bg-[#3776AB] max-w-20">Edit</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader>Edit Course</ModalHeader>
                            <ModalBody>
                                {info.message != "" &&
                                    <Alert
                                        color={info.status === "success" ? "success" : "danger"}
                                        title={info.message}
                                    />
                                }
                                <Form
                                    onSubmit={submitForm}
                                    validationBehavior="native"
                                >
                                    <Input
                                        type="text"
                                        name="title"
                                        label="Title:"
                                        defaultValue={course.title}
                                        isRequired
                                    />
                                    <Button isLoading={isLoading} className="self-end bg-[#3776AB] text-white" type="submit">
                                        Save
                                    </Button>
                                </Form>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

function AddCohort({ course_id }: { course_id: string }) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [info, setInfo] = useState({status: "", message: ""});
    const [isLoading, setIsLoading] = useState(false);

    async function submitForm(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);
        const form = e.currentTarget as HTMLFormElement;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_V1}/cohort/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Cookies.get("access_token")}`
                },
                body: JSON.stringify({...data, course_id}),
            });

            if (res.ok) {
                setInfo({status: "success", message: "Cohort Creation Successful!"});
            } else {
                setInfo({status: "fail", message: "An error occured!"});
            }
        } catch {
            setInfo({status: "fail", message: "An error occured!"});
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <>
            <Button onPress={onOpen} size="sm" className="text-white bg-[#3776AB] max-w-20">Add Cohort</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader>Add Cohort</ModalHeader>
                            <ModalBody>
                                {info.message != "" &&
                                    <Alert
                                        color={info.status === "success" ? "success" : "danger"}
                                        title={info.message}
                                    />
                                }
                                <Form
                                    onSubmit={submitForm}
                                    validationBehavior="native"
                                >
                                    <Input
                                        type="text"
                                        name="name"
                                        label="Name:"
                                        isRequired
                                    />
                                    <Button isLoading={isLoading} className="self-end bg-[#3776AB] text-white" type="submit">
                                        Add Cohort
                                    </Button>
                                </Form>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}