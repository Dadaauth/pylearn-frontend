"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Button, Chip, ChipProps, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip, useDisclosure } from "@nextui-org/react";
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import { OpenInNew, Delete, EditOutlined } from "@mui/icons-material";

import AppNavBar from "@/components/ui/navbar";
import ProtectedAdmin from "@/components/utils/ProtectedAdmin";

export default function Page() {
    const [toDelete, SetToDelete] = useState({
        type: "",
        id: "",
        title: "",
    });
    const {isOpen, onOpen, onOpenChange}= useDisclosure();
    const [projects, setProjects] = useState<{ id: string, key: string, name: string, status: string }[] | null>(null);

    function openDeleteModal(id: string, title: string, type: string) {
        SetToDelete({id, title, type});
        onOpen();
    }
    return (
        <>
            <AppNavBar />
            <ProtectedAdmin>
                <div className="mx-6 sm:flex flex-row gap-16">
                    <ModulesTable
                        setProjects={setProjects}
                        openDeleteModal={openDeleteModal}
                    />
                    <ProjectsTable
                        projects={projects}
                        openDeleteModal={openDeleteModal}
                    />
                </div>
                <Modal
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                >
                    <ModalContent>
                        {(onClose) => (
                            <>                    
                                <ModalHeader>
                                    Delete {toDelete.type} - {toDelete.title}?
                                </ModalHeader>
                                <ModalBody>
                                    <p>
                                        Are you sure you want to delete {toDelete.type} - {toDelete.title}?
                                    </p>
                                    <p>
                                        To proceed, please enter [{toDelete.id}] below:
                                    </p>
                                </ModalBody>
                                <ModalFooter>
                                    <div className="w-full flex flex-row gap-3 items-center">
                                        <Input
                                            type="text"
                                            label={`${toDelete.type} ID`}
                                            name="ID"
                                        />
                                        <Button>Submit</Button>
                                    </div>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </ProtectedAdmin>
        </>
    );
}


function ModulesTable(props: {
    setProjects: React.Dispatch<React.SetStateAction<{
        id: string, key: string, name: string, status: string
    }[] | null>>,
    openDeleteModal: Function
}) {
    const router = useRouter();
    const columns = [
        {
            key: "name",
            label: "MODULE NAME"
        },
        {
            key: "status",
            label: "STATUS"
        },
        {
            key: "actions",
            label: "ACTIONS"
        },
        
    ]
    const rows = [
        {
            key: "1",
            id: "1",
            name: "Introduction to Python",
            status: "published",
            projects: [
                {
                    id: "1",
                    key: "1",
                    name: "Variables And Data Types",
                    status: "published"
                },
                {
                    id: "2",
                    key: "2",
                    name: "Functions",
                    status: "published"
                },
                {
                    id: "3",
                    key: "3",
                    name: "Modules and Imports",
                    status: "published"
                },
                {
                    id: "4",
                    key: "4",
                    name: "The Datetime Module",
                    status: "draft"
                },
            ]
        },
        {
            key: "2",
            id: "2",
            name: "Code Version Control",
            status: "published",
            projects: [
                {
                    id: "5",
                    key: "1",
                    name: "Git",
                    status: "draft"
                },
                {
                    id: "6",
                    key: "2",
                    name: "Github",
                    status: "published"
                },
                {
                    id: "7",
                    key: "3",
                    name: "Version Control",
                    status: "published"
                },
                {
                    id: "8",
                    key: "4",
                    name: "Collaboration | Push & Pull Requests",
                    status: "published"
                },
            ]
        },
        {
            key: "3",
            id: "3",
            name: "DevOps & Deployment Strategies",
            status: "published",
            projects: [
                {
                    id: "9",
                    key: "1",
                    name: "Introduction to DevOps",
                    status: "published"
                },
                {
                    id: "10",
                    key: "2",
                    name: "Server Monitoring",
                    status: "draft"
                },
                {
                    id: "11",
                    key: "3",
                    name: "Deployment Strategies",
                    status: "published"
                },
                {
                    id: "12",
                    key: "4",
                    name: "Compression & CI/CD",
                    status: "published"
                },
            ]
        },
        {
            key: "4",
            id: "4",
            name: "Introduction to JavaScript",
            status: "published",
            projects: [
                {
                    id: "13",
                    key: "1",
                    name: "Variables And Data Types",
                    status: "published"
                },
                {
                    id: "14",
                    key: "2",
                    name: "Functions",
                    status: "published"
                },
                {
                    id: "15",
                    key: "3",
                    name: "ES6 Modules and Imports",
                    status: "published"
                },
                {
                    id: "16",
                    key: "4",
                    name: "Node.js",
                    status: "draft"
                },
            ]
        },
    ]

    const statusColorMap: Record<string, ChipProps["color"]> = {
        published: "success",
        draft: "danger"
    }
    return (
        <div>
            <h2 className="text-[#2B2D42] font-bold">Modules</h2>
            <Table className="mt-4" aria-label="Table containing project modules">
                <TableHeader columns={columns}>
                    {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                </TableHeader>
                <TableBody emptyContent={"No modules to display"}>
                    {rows.map((item) => {
                        return (
                            <TableRow key={item.key}>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>
                                    <Chip
                                        className="capitalize"
                                        color={statusColorMap[item.status]}
                                        size="sm"
                                        variant="dot"
                                    >
                                        {item.status}
                                    </Chip>
                                </TableCell>
                                <TableCell>
                                    <Tooltip content="edit">
                                        <EditOutlined
                                            fontSize="small"
                                            className="cursor-pointer"
                                            onClick={() => router.push(`/admin/module/edit/${item.id}`)}
                                        />
                                    </Tooltip>
                                    <Tooltip content="open">
                                        <KeyboardArrowRightOutlinedIcon
                                            fontSize="small"
                                            className="cursor-pointer"
                                            onClick={() => props.setProjects(item.projects)}
                                        />
                                    </Tooltip>
                                    <Tooltip content="delete">
                                        <Delete
                                            color="error"
                                            fontSize="small"
                                            className="cursor-pointer"
                                            onClick={() => props.openDeleteModal(item.id, item.name, "Module")}
                                        />
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}


function ProjectsTable(props: {
    projects: {
        id: string, key: string, name: string, status: string
    }[] | null | undefined,
    openDeleteModal: Function
}) {
    const router = useRouter();
    const columns = [
        {
            key: "name",
            label: "PROJECT NAME"
        },
        {
            key: "status",
            label: "STATUS"
        },
        {
            key: "actions",
            label: "ACTIONS"
        },
        
    ]

    const statusColorMap: Record<string, ChipProps["color"]> = {
        published: "success",
        draft: "danger"
    }
    return (
        <>
            <div>
                <h2 className="text-[#2B2D42] font-bold">Projects</h2>
                <Table className="mt-4" aria-label="Table containing project modules">
                    <TableHeader columns={columns}>
                        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                    </TableHeader>
                    {props.projects ? (
                        <TableBody emptyContent={"No projects to display"}>
                            {props.projects.map((item) => {
                                return (
                                    <TableRow key={item.key}>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>
                                            <Chip
                                                className="capitalize"
                                                color={statusColorMap[item.status]}
                                                size="sm"
                                                variant="dot"
                                            >
                                                {item.status}
                                            </Chip>
                                        </TableCell>
                                        <TableCell>
                                            <Tooltip content="edit">
                                                <EditOutlined
                                                    fontSize="small"
                                                    className="cursor-pointer"
                                                    onClick={() => router.push(`/admin/project/edit/${item.id}`)}
                                                />
                                            </Tooltip>
                                            <Tooltip content="open">
                                                <OpenInNew
                                                    fontSize="small"
                                                    className="cursor-pointer"
                                                    onClick={() => router.push(`/project/${item.id}`)}
                                                />
                                            </Tooltip>
                                            <Tooltip content="delete">
                                                <Delete
                                                    color="error"
                                                    fontSize="small"
                                                    className="cursor-pointer"
                                                    onClick={() => props.openDeleteModal(item.id, item.name, "Project")}
                                                />
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    ) : (
                        <TableBody emptyContent={"No projects to display"}>{[]}</TableBody>
                    )}
                </Table>
            </div>
        </>
    );
}