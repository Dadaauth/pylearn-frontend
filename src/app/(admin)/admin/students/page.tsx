"use client"
import AppNavBar from "@/components/ui/navbar";
import WelcomeSection from "@/components/ui/welcomeSection";
import ProtectedAdmin from "@/components/utils/ProtectedAdmin";
import { Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Modal, Input 
    , ModalHeader, ModalBody, ModalFooter, ModalContent,
    useDisclosure,
    Form,
    Alert,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";


export default function Page() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    return (
        <>
            <AppNavBar />
            <ProtectedAdmin>
                <WelcomeSection />
                <div className="mx-6">
                    <Button
                        onClick={onOpen}
                        className="bg-[#3776AB] text-white mb-5"
                    >
                        Create New Student
                    </Button>
                    <StudentsTable />
                </div>
                <CreateStudentModal
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                />
            </ProtectedAdmin>
        </>
    );
}

interface Student {
    first_name: string;
    last_name: string;
    email: string;
    registration_number: string;
    status: string;
}

function StudentsTable() {
    const [students, setStudents] = useState<Student[]>([]);

    useEffect(() => {
        async function fetchData() {
            setStudents(await fetchStudents());
        }
        fetchData();
    }, [])

    return (
        <>
            <Table aria-label="Students Table">
                <TableHeader>
                    <TableColumn>Name</TableColumn>
                    <TableColumn>Email</TableColumn>
                    <TableColumn>Registration Number</TableColumn>
                    <TableColumn>Status</TableColumn>
                    <TableColumn>Actions</TableColumn>
                </TableHeader>
                <TableBody>
                    {students.map((student, index) => (
                        <TableRow key={index}>
                            <TableCell>{student.first_name} {student.last_name}</TableCell>
                            <TableCell>{student.email}</TableCell>
                            <TableCell>{student.registration_number}</TableCell>
                            <TableCell>{student.status}</TableCell>
                            <TableCell>
                                <Button className="bg-[#F94144] text-white">
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
}


interface CreateStudentModalProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
}

function CreateStudentModal({isOpen, onOpenChange}: CreateStudentModalProps) {
    const [info, setInfo] = useState({
        status: "",
        message: ""
    });
    async function submitForm(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            console.log(data);
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_V1}/admin/student/create`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${Cookies.get("access_token")}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({...data}),
            });
            console.log(await res.json());
            if (res.ok) {
                setInfo({status: "success", message: "Student created successfully!"});
            } else {
                setInfo({status: "error", message: "An error occurred!"});
            }
        } catch (err) {
            setInfo({status: "error", message: "An error occurred!"});
        }
    }

    return (
        <Modal
            aria-label="modal-title"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader>
                            <h4>Create New Student</h4>
                        </ModalHeader>
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
                                    type="email"
                                    name="email"
                                    label="Email"
                                    isRequired
                                />
                                <Button type="submit" className="self-end bg-[#3776AB] text-white">Create</Button>
                            </Form>
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}


async function fetchStudents() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_V1}/admin/students`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${Cookies.get("access_token")}`
            }
        })
    
        if (res.ok) {
            return (await res.json()).data.students;
        }
        return [];
    } catch (err) {return [];}
}