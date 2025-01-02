"use client"
import AppNavBar from "@/components/ui/navbar";
import WelcomeSection from "@/components/ui/welcomeSection";
import ProtectedAdmin from "@/components/utils/ProtectedAdmin";
import { Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Modal, Input 
    , ModalHeader, ModalBody, ModalFooter, ModalContent,
    useDisclosure,
} from "@nextui-org/react";
import { useState } from "react";


export default function Page() {
    return (
        <>
            <AppNavBar />
            <ProtectedAdmin>
                <WelcomeSection />
                <div className="mx-6">
                    <StudentsTable />
                </div>
            </ProtectedAdmin>
        </>
    );
}

function StudentsTable() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const students = [
        { name: "John Doe", regNo: "12345", regDate: "2023-01-01" },
        { name: "Jane Smith", regNo: "67890", regDate: "2023-02-01" },
    ]

    return (
        <>
            <Button
                onClick={onOpen}
                className="bg-[#3776AB] text-white mb-5"
            >
                Create New Student
            </Button>
            <Table aria-label="Students Table">
                <TableHeader>
                    <TableColumn>Name</TableColumn>
                    <TableColumn>Registration Number</TableColumn>
                    <TableColumn>Registration Date</TableColumn>
                    <TableColumn>Actions</TableColumn>
                </TableHeader>
                <TableBody>
                    {students.map((student, index) => (
                        <TableRow key={index}>
                            <TableCell>{student.name}</TableCell>
                            <TableCell>{student.regNo}</TableCell>
                            <TableCell>{student.regDate}</TableCell>
                            <TableCell>
                                <Button className="bg-[#F94144] text-white">
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

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
                                <Input
                                    type="text"
                                    name="name"
                                    label="Name:"
                                    isRequired
                                />
                                <Input
                                    type="text"
                                    name="regNo"
                                    label="Registration Number:"
                                    isRequired
                                />
                                <Input
                                    type="date"
                                    name="regDate"
                                    label="Registration Date:"
                                    isRequired
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button>
                                    Create
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}