"use client"
import AppNavBar from "@/components/ui/navbar";
import WelcomeSection from "@/components/ui/welcomeSection";
import { Chip, ChipProps, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, getKeyValue } from "@nextui-org/react";
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import { useState } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/utils/protected";

export default function Page() {
    const [projects, setProjects] = useState<{ id: string, key: string, name: string, status: string }[] | null>(null);
    return (
        <>
            <AppNavBar />
            <ProtectedRoute>
                <WelcomeSection />
                <div className="mx-6 sm:flex flex-row gap-16">
                    <ModulesTable
                        setProjects={setProjects}
                    />
                    <ProjectsTable
                        projects={projects}
                    />
                </div>
            </ProtectedRoute>
        </>
    );
}

function ModulesTable(props: {
    setProjects: React.Dispatch<React.SetStateAction<{
        id: string, key: string, name: string, status: string
    }[] | null>>
}) {
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
            key: "action",
            label: "ACTION"
        },
        
    ]
    const rows = [
        {
            key: "1",
            name: "Introduction to Python",
            status: "completed",
            projects: [
                {
                    id: "1",
                    key: "1",
                    name: "Variables And Data Types",
                    status: "completed"
                },
                {
                    id: "2",
                    key: "2",
                    name: "Functions",
                    status: "completed"
                },
                {
                    id: "3",
                    key: "3",
                    name: "Modules and Imports",
                    status: "completed"
                },
                {
                    id: "4",
                    key: "4",
                    name: "The Datetime Module",
                    status: "completed"
                },
            ]
        },
        {
            key: "2",
            name: "Code Version Control",
            status: "released",
            projects: [
                {
                    id: "5",
                    key: "1",
                    name: "Git",
                    status: "completed"
                },
                {
                    id: "6",
                    key: "2",
                    name: "Github",
                    status: "completed"
                },
                {
                    id: "7",
                    key: "3",
                    name: "Version Control",
                    status: "released"
                },
                {
                    id: "8",
                    key: "4",
                    name: "Collaboration | Push & Pull Requests",
                    status: "locked"
                },
            ]
        },
        {
            key: "3",
            name: "DevOps & Deployment Strategies",
            status: "locked",
            projects: [
                {
                    id: "9",
                    key: "1",
                    name: "Introduction to DevOps",
                    status: "locked"
                },
                {
                    id: "10",
                    key: "2",
                    name: "Server Monitoring",
                    status: "locked"
                },
                {
                    id: "11",
                    key: "3",
                    name: "Deployment Strategies",
                    status: "locked"
                },
                {
                    id: "12",
                    key: "4",
                    name: "Compression & CI/CD",
                    status: "locked"
                },
            ]
        },
        {
            key: "4",
            name: "Introduction to JavaScript",
            status: "locked",
            projects: [
                {
                    id: "13",
                    key: "1",
                    name: "Variables And Data Types",
                    status: "locked"
                },
                {
                    id: "14",
                    key: "2",
                    name: "Functions",
                    status: "locked"
                },
                {
                    id: "15",
                    key: "3",
                    name: "ES6 Modules and Imports",
                    status: "locked"
                },
                {
                    id: "16",
                    key: "4",
                    name: "Node.js",
                    status: "locked"
                },
            ]
        },
    ]

    const statusColorMap: Record<string, ChipProps["color"]> = {
        completed: "success",
        released: "warning",
        locked: "danger"
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
                                    <Chip
                                        endContent={<KeyboardArrowRightOutlinedIcon />}
                                        className="cursor-pointer"
                                        onClick={() => props.setProjects(item.projects)}
                                    >
                                        Open
                                    </Chip>
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
    }[] | null | undefined
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
            key: "action",
            label: "ACTION"
        },
        
    ]

    const statusColorMap: Record<string, ChipProps["color"]> = {
        completed: "success",
        released: "warning",
        locked: "danger"
    }

    function OpenProject(id: string, status: string) {
        if (status == "released" || status == "completed")
            router.push(`/project/${id}`)
    }
    return (
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
                                        <Chip
                                            endContent={<KeyboardArrowRightOutlinedIcon />}
                                            className="cursor-pointer"
                                            onClick={() => OpenProject(item.id, item.status)}
                                            isDisabled={!(item.status == "released" || item.status == "completed")}
                                        >
                                            Open
                                        </Chip>
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
    );
}