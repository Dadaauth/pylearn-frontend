"use client"
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Chip, ChipProps, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';

import AppNavBar from "@/components/ui/navbar";
import ProtectedRoute from "@/components/utils/protected";
import { PageData, Project, Module } from "./definitions";
import { fetchData } from "./utils";
import LoadingPage from "@/components/ui/loadingPage";

export default function Page() {
    const [data, setData] = useState<PageData | null>(null);
    const [loading, setLoading] = useState(true);
    const [projects, setProjects] = useState<Project[] | []>([]);

    useEffect(() => {
        fetchData().then((result) => {
            setData(result);
            console.log(result);
            setLoading(false);
        })
    }, []);


    if (loading) return <LoadingPage />
    if (!data) return <p>Error Loading Page!</p>
    return (
        <>
            <AppNavBar />
            <ProtectedRoute>
                <div className="mx-6 flex flex-col justify-center gap-10">
                    <ModulesTable
                        setProjects={setProjects}
                        modules={data.modules}
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
    setProjects: React.Dispatch<React.SetStateAction<Project[] | []>>,
    modules: Module[],
}) {
    const [page, setPage] = useState(1);
    const rowsPerPage = 4;

    const pages = Math.ceil(props.modules.length / rowsPerPage);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return props.modules.slice(start, end);
    }, [page, props.modules]);
    const columns = [
        {
            key: "name",
            label: "MODULE NAME"
        },
        {
            key: "action",
            label: "ACTION"
        }, 
    ]

    return (
        <div>
            <h2 className="text-[#2B2D42] font-bold mb-4">Modules</h2>
            <Table className="" aria-label="Table containing project modules" isStriped
                bottomContent={
                <div className="flex w-full justify-center">
                    <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="default"
                    page={page}
                    total={pages}
                    onChange={(page) => setPage(page)}
                    />
                </div>
                }
                classNames={{
                    wrapper: "min-h-[222px]",
                }}                    
            >
                <TableHeader columns={columns}>
                    {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                </TableHeader>
                <TableBody emptyContent={"No modules to display"}>
                    {items.map((item) => {
                        return (
                            <TableRow key={item.id}>
                                <TableCell>{item.title}</TableCell>
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
    const [page, setPage] = useState(1);
    const rowsPerPage = 4;

    const pages = Math.ceil(props.projects.length / rowsPerPage);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return props.projects.slice(start, end);
    }, [page, props.projects]);
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
    }
    return (
        <div>
            <h2 className="text-[#2B2D42] font-bold mb-4">Projects</h2>
            <Table className="" aria-label="Table containing project modules" isStriped
                bottomContent={
                <div className="flex w-full justify-center">
                    <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="default"
                    page={page}
                    total={pages}
                    onChange={(page) => setPage(page)}
                    />
                </div>
                }
                classNames={{
                    wrapper: "min-h-[222px]",
                }}                
            >
                <TableHeader columns={columns}>
                    {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                </TableHeader>
                {props.projects ? (
                    <TableBody emptyContent={"No projects to display"}>
                        {items.map((item) => {
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
                                            onClick={() => router.push(`/project/${item.id}`)}
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