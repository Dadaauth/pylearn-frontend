"use client"
import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Button, Chip, ChipProps, Table, TableBody, Pagination, TableCell, TableColumn, TableHeader, TableRow, Tooltip, useDisclosure } from "@heroui/react";
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import { OpenInNew, Delete, EditOutlined } from "@mui/icons-material";


import AppNavBar from "@/components/ui/navbar";
import ProtectedAdminMentor from "@/components/utils/ProtectedAdminMentor";
import { CreateModuleModal, ProjectDeleteModal, ModuleDeleteModal, ModuleEditModal } from "./modals";
import { fetchData } from "./utils";
import { Module, PageData, Project } from "./definitions";
import LoadingPage from "@/components/ui/loadingPage";


export default function Page() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<PageData | null>(null);
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        fetchData().then((result) => {
            setData(result);
            setLoading(false);
        });
    }, []);


    if (loading) return <LoadingPage />
    if (!data) return <p>Error Loading Page!</p>
    return (
        <>
            <AppNavBar />
            <ProtectedAdminMentor>
                <div className="mx-6 mb-4 flex gap-4">
                    <CreateModule />
                    <Button as={Link} size="sm" href={"/admin/project/new"} className="bg-[#3776AB] text-white">
                        Create Project
                    </Button>
                </div>
                <div className="mx-6 flex flex-col gap-16">
                    <ModulesTable
                        setProjects={setProjects}
                        modules={data.modules}
                    />
                    <ProjectsTable
                        projects={projects}
                    />
                </div>
            </ProtectedAdminMentor>
        </>
    );
}



function CreateModule() {
    const {isOpen, onOpen, onOpenChange } = useDisclosure();
    return (
        <>
            <Button size="sm" onPress={onOpen} className="bg-[#3776AB] text-white">
                Create Module
            </Button>
            <CreateModuleModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
            />
        </>
    );
}

function ModulesTable(props: {
    setProjects: React.Dispatch<React.SetStateAction<Project[]>>,
    modules: Module[]
}) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const {isOpen: isOpen_editModule, onOpen: onOpen_editModule, onOpenChange: onOpenChange_editModule} = useDisclosure();
    const [toDelete, SetToDelete] = useState({ id: "", title: "" });
    const [toEdit, SetToEdit] = useState({ id: "", title: "", status: "",
        description: "", prev_module_id: "" });

    // Table Pagination Data
    const [page, setPage] = useState(1);
    const rowsPerPage = 4;

    const pages = Math.ceil(props.modules.length / rowsPerPage);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return props.modules.slice(start, end);
    }, [page, props.modules]);

    // Modal Opening Functions
    function openEditModal(id: string, title: string, status: string, description: string, prev_module_id: string) {
        SetToEdit({id, title, status, description, prev_module_id});
        onOpen_editModule();
    }
    function openDeleteModal(id: string, title: string) {
        SetToDelete({id, title});
        onOpen();
    }

    const statusColorMap: Record<string, ChipProps["color"]> = {
        published: "success",
        draft: "danger"
    }
    return (
        <div>
            <h2 className="text-[#2B2D42] font-bold">Modules</h2>
            <Table className="mt-4" aria-label="Table containing project modules"
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
                <TableHeader>
                    <TableColumn>MODULE NAME</TableColumn>
                    <TableColumn>STATUS</TableColumn>
                    <TableColumn>ACTIONS</TableColumn>
                </TableHeader>
                <TableBody emptyContent={"No modules to display"}>
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
                                    <Tooltip content="edit">
                                        <EditOutlined
                                            fontSize="small"
                                            className="cursor-pointer"
                                            onClick={() => openEditModal(item.id, item.title, item.status, item.description, item.prev_module_id)}
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
                                            onClick={() => openDeleteModal(item.id, item.title)}
                                        />
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
            <ModuleDeleteModal isOpen={isOpen} onOpenChange={onOpenChange} toDelete={toDelete} />
            <ModuleEditModal isOpen={isOpen_editModule} onOpenChange={onOpenChange_editModule} toEdit={toEdit} />
        </div>
    );
}

function ProjectsTable(props: {
    projects: Project[],
}) {
    const router = useRouter();
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [toDelete, SetToDelete] = useState({
        id: "",
        title: "",
    });

    // Table Pagination Data
    const [page, setPage] = useState(1);
    const rowsPerPage = 4;

    const pages = Math.ceil((props.projects.length) / rowsPerPage);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return props.projects.slice(start, end);
    }, [page, props.projects]);

    const statusColorMap: Record<string, ChipProps["color"]> = {
        published: "success",
        draft: "danger"
    }

    function openDeleteModal(id: string, title: string) {
        SetToDelete({id, title});
        onOpen();
    }
    return (
        <>
            <div>
                <h2 className="text-[#2B2D42] font-bold">Projects</h2>
                <Table className="mt-4" aria-label="Table containing project modules"
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
                    <TableHeader>
                        <TableColumn>PROJECT NAME</TableColumn>
                        <TableColumn>STATUS</TableColumn>
                        <TableColumn>ACTIONS</TableColumn>
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
                                                    onClick={() => router.push(`/admin/project/${item.id}`)}
                                                />
                                            </Tooltip>
                                            <Tooltip content="delete">
                                                <Delete
                                                    color="error"
                                                    fontSize="small"
                                                    className="cursor-pointer"
                                                    onClick={() => openDeleteModal(item.id, item.title)}
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
                <ProjectDeleteModal isOpen={isOpen} onOpenChange={onOpenChange} toDelete={toDelete} />
            </div>
        </>
    );
}