"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Chip, ChipProps, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, getKeyValue } from "@nextui-org/react";
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';

import AppNavBar from "@/components/ui/navbar";
import WelcomeSection from "@/components/ui/welcomeSection";
import ProtectedRoute from "@/components/utils/protected";
import { Project, Module } from "./definitions";
import { fetchModules } from "./utils";

export default function Page() {
    const [projects, setProjects] = useState<Project[]>([]);
    return (
        <>
            <AppNavBar />
            <ProtectedRoute>
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
    setProjects: React.Dispatch<React.SetStateAction<Project[]>>
}) {
    const [modules, setModules] = useState<Module[]>([]);

     useEffect(() => {
        async function fetchData() {
            const tmp = await fetchModules();
            const mds = [];
            for (let i = 0; i < tmp.length; i++) {
                let id = tmp[i].id;
                let title = tmp[i].title;
                let projects = tmp[i].projects;
                let status = tmp[i].status;
                let description = tmp[i].description;
                mds.push({id, title, projects, status, description});
            }
            setModules(mds);
        }

        fetchData();
    }, []);

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
                    {modules.map((item) => {
                        return (
                            <TableRow key={item.id}>
                                <TableCell>{item.title}</TableCell>
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
    projects: Project[]
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
        submitted: "success",
        graded: "success",
        verified: "success",
        released: "warning",
        locked: "danger"
    }

    function OpenProject(id: string, status: string) {
        if (status != "locked")
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
                                <TableRow key={item.id}>
                                    <TableCell>{item.title}</TableCell>
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
                                            isDisabled={!(item.status != "locked")}
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