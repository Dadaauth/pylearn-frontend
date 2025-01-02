"use client"
import AppNavBar from "@/components/ui/navbar";
import WelcomeSection from "@/components/ui/welcomeSection";
import ProtectedAdmin from "@/components/utils/ProtectedAdmin";
import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from "@nextui-org/react";


export default function Page() {
    return (
        <>
            <AppNavBar />
            <ProtectedAdmin>
                <WelcomeSection />
                <div className="mx-6">
                    <ProjectSubmissionsTable />
                </div>
            </ProtectedAdmin>
        </>
    );
}


function ProjectSubmissionsTable() {
    const  {onOpen, isOpen, onOpenChange} = useDisclosure();
    return (
        <>
            <Table aria-label="Table containing project submissions for students">
                <TableHeader>
                    <TableColumn>Name Of Student</TableColumn>
                    <TableColumn>Project Name</TableColumn>
                    <TableColumn>Date Submitted</TableColumn>
                    <TableColumn>Action</TableColumn>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>John Doe</TableCell>
                        <TableCell>Project 1</TableCell>
                        <TableCell>12/12/2021</TableCell>
                        <TableCell className="flex flex-row gap-4">
                            <Button size="sm" className="bg-[#3776AB] text-white px-2 py-1 rounded-md">View</Button>
                            <Button size="sm" onClick={onOpen} className="bg-[#3776AB] text-white px-2 py-1 rounded-md">Grade</Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>Grade John Doe</ModalHeader>
                            <ModalBody className="flex flex-row gap-4 items-center">
                                <Input label="Grade" type="number" />
                                <Button className="bg-[#3776AB] text-white">Submit</Button>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}