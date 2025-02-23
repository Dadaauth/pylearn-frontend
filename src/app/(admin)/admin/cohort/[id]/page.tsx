"use client"
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

import AppNavBar from "@/components/ui/navbar";
import ProtectedAdmin from "@/components/utils/ProtectedAdmin";
import { fetchCohortWithStudents, fetchStudentsWithNoCohortAssigned } from "./utils";
import { Cohort, Student } from "./definitions";
import { Alert, Button, Chip, Form, Input, Modal, ModalBody, ModalContent, ModalHeader, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from "@nextui-org/react";

export default function Page({
    params,
  }: {
    params: Promise<{ id: string }>
  }) {
    const [cohort, setCohort] = useState<Cohort>({
        id: "",
        name: "",
        status: "",
        students: [],
        course: {
            id: "",
        }
    });

    useEffect(() => {
        async function fetchData() {
            const cohort_id = (await params).id
            const data = await fetchCohortWithStudents(cohort_id);
            if (data) {
                setCohort(data);
            }
        }

        fetchData();
    }, [])

    return (
        <ProtectedAdmin>
            <AppNavBar />
            <div className="mx-6">
                <div className="flex flex-row gap-4">
                    <p className="font-medium text-xl">{cohort.name}</p>
                    <Chip
                        color={cohort.status == "pending"? "warning": cohort.status == "in-progress"? "danger": "success"}
                        className="text-white"
                    >
                        {cohort.status}
                    </Chip>
                </div>

                <div className="mt-5 flex flex-row gap-4">
                    <EditCohort cohort={cohort}/>
                    <AddStudents course_id={cohort.course.id} cohort_id={cohort.id}/>
                </div>
                <StudentsTable students={cohort.students} />
            </div>
        </ProtectedAdmin>
    );
}

function EditCohort({cohort}: {cohort: Cohort}) {
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
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_V1}/cohort/${cohort.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Cookies.get("access_token")}`
                },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                setInfo({status: "success", message: "Data Update Successful!"});
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
        <>
            <Button onPress={onOpen} size="sm" className="text-white bg-[#3776AB] max-w-20">Edit</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>Edit Cohort</ModalHeader>
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
                                        type="text"
                                        name="name"
                                        label="Name:"
                                        defaultValue={cohort.name}
                                        isRequired
                                    />
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="status">Status</label>
                                        <select name="status" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="status" required>
                                            <option value="pending">pending</option>
                                            <option value="in-progress">in-progress</option>
                                            <option value="completed">completed</option>
                                        </select>
                                    </div>
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

function AddStudents({course_id, cohort_id}: {course_id: string, cohort_id: string}) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [info, setInfo] = useState({status: "", message: ""});
    const [isLoading, setIsLoading] = useState(false);
    const [students, setStudents] = useState<Student[]>([]);

    useEffect(() => {
        async function fetchData() {
            const stds = await fetchStudentsWithNoCohortAssigned(course_id);
            setStudents(stds);
        }

        fetchData();
    }, [course_id, cohort_id]);

    async function submitForm(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);
        const form = e.currentTarget as HTMLFormElement;
        const formData = new FormData(form);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_V1}/cohort/${cohort_id}/add-students`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${Cookies.get("access_token")}`
                },
                body: formData,
            });

            if (res.ok) {
                setInfo({status: "success", message: "Student(s) Added Successfully!"});
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
        <>
            <Button onPress={onOpen} size="sm" className="text-white bg-[#3776AB] max-w-20">Add Student</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>Add Student(s)</ModalHeader>
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
                                    {students.map((student, idx) => {
                                        return (
                                            <label key={idx}><input type="checkbox" name="student_ids" value={student.id} />{student.first_name} {student.last_name} - {student.email}</label>
                                        );
                                    })}
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

function StudentsTable({students}: {students: Student[]}) {
    return (
        <div className="mt-5">
            <p className="mb-4 font-medium text-sm">Students</p>
            <Table aria-label="Students Table">
                <TableHeader>
                    <TableColumn>Name</TableColumn>
                    <TableColumn>Email</TableColumn>
                </TableHeader>
                <TableBody>
                    {students.map((student, index) => (
                        <TableRow key={index}>
                            <TableCell>{student.first_name} {student.last_name}</TableCell>
                            <TableCell>{student.email}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}