"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Button, Chip, ChipProps, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip, useDisclosure } from "@nextui-org/react";
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import { OpenInNew, Delete, EditOutlined } from "@mui/icons-material";
import Cookies from "js-cookie";

import AppNavBar from "@/components/ui/navbar";
import ProtectedAdminMentor from "@/components/utils/ProtectedAdminMentor";
import { CreateModuleModal, DeleteModal, ModuleEditModal } from "./modals";
import { fetchModules } from "./utils";
import { Module, Project } from "./definitions";

export default function Page() {
    const [toDelete, SetToDelete] = useState({
        type: "",
        id: "",
        title: "",
    });
    const {isOpen, onOpen, onOpenChange}= useDisclosure();
    const {isOpen: isOpen_newmodule, onOpen: onOpen_newmodule, onOpenChange: onOpenChange_newmodule} = useDisclosure();
    const [projects, setProjects] = useState<Project[]>([]);
    const userRole = Cookies.get("role")

    function openDeleteModal(id: string, title: string, type: string) {
        SetToDelete({id, title, type});
        onOpen();
    }
    return (
        <>
            <AppNavBar />
            <ProtectedAdminMentor>
                {userRole == "admin" &&
                    <div className="mx-6 mb-4 flex gap-4">
                        <Button size="sm" onPress={onOpen_newmodule} className="bg-[#3776AB] text-white">
                            Create Module
                        </Button>
                        <Button
                            as={Link}
                            size="sm"
                            href={"/admin/project/new"}
                            className="bg-[#3776AB] text-white"
                        >
                            Create Project
                        </Button>
                    </div>
                }
                <div className="mx-6 sm:flex flex-row gap-16">
                    <ModulesTable
                        setProjects={setProjects}
                        openDeleteModal={openDeleteModal}
                        userRole={userRole}
                    />
                    <ProjectsTable
                        projects={projects}
                        openDeleteModal={openDeleteModal}
                        userRole={userRole}
                    />
                </div>
                {userRole == 'admin' &&
                    <>
                        <DeleteModal
                            isOpen={isOpen}
                            onOpenChange={onOpenChange}
                            toDelete={toDelete}
                        />
                        <CreateModuleModal
                            isOpen={isOpen_newmodule}
                            onOpenChange={onOpenChange_newmodule}
                        />
                    </>
                }
            </ProtectedAdminMentor>
        </>
    );
}

function ModulesTable(props: {
    setProjects: React.Dispatch<React.SetStateAction<Project[]>>,
    openDeleteModal: Function,
    userRole: string | undefined,
}) {
    const [modules, setModules] = useState<Module[]>([]);
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [toEdit, SetToEdit] = useState({
        id: "",
        title: "",
        status: "",
        description: "",
        prev_module_id: "",
    });

    function openEditModal(id: string, title: string, status: string, description: string, prev_module_id: string) {
        SetToEdit({id, title, status, description, prev_module_id});
        onOpen();
    }

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
                let prev_module_id = tmp[i].prev_module_id;
                mds.push({id, title, projects, status, description, prev_module_id});
            }
            setModules(mds);
        }

        fetchData();
    }, []);

    const statusColorMap: Record<string, ChipProps["color"]> = {
        published: "success",
        draft: "danger"
    }
    return (
        <div>
            <h2 className="text-[#2B2D42] font-bold">Modules</h2>
            <Table className="mt-4" aria-label="Table containing project modules">
                <TableHeader>
                    <TableColumn>MODULE NAME</TableColumn>
                    <TableColumn>STATUS</TableColumn>
                    <TableColumn>ACTIONS</TableColumn>
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
                                    {props.userRole == "admin" &&
                                        <Tooltip content="edit">
                                            <EditOutlined
                                                fontSize="small"
                                                className="cursor-pointer"
                                                onClick={() => openEditModal(item.id, item.title, item.status, item.description, item.prev_module_id)}
                                            />
                                        </Tooltip>
                                    }
                                    <Tooltip content="open">
                                        <KeyboardArrowRightOutlinedIcon
                                            fontSize="small"
                                            className="cursor-pointer"
                                            onClick={() => props.setProjects(item.projects)}
                                        />
                                    </Tooltip>
                                    {props.userRole == "admin" &&
                                        <Tooltip content="delete">
                                            <Delete
                                                color="error"
                                                fontSize="small"
                                                className="cursor-pointer"
                                                onClick={() => props.openDeleteModal(item.id, item.title, "Module")}
                                            />
                                        </Tooltip>
                                    }
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
            {props.userRole == "admin" &&
                <ModuleEditModal
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    toEdit={toEdit}
                />
            }
        </div>
    );
}

function ProjectsTable(props: {
    projects: Project[] | null | undefined,
    openDeleteModal: Function,
    userRole: string | undefined,
}) {
    const router = useRouter();

    const statusColorMap: Record<string, ChipProps["color"]> = {
        published: "success",
        draft: "danger"
    }
    return (
        <>
            <div>
                <h2 className="text-[#2B2D42] font-bold">Projects</h2>
                <Table className="mt-4" aria-label="Table containing project modules">
                    <TableHeader>
                        <TableColumn>PROJECT NAME</TableColumn>
                        <TableColumn>STATUS</TableColumn>
                        <TableColumn>ACTIONS</TableColumn>
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
                                            {props.userRole == "admin" &&
                                                <Tooltip content="edit">
                                                    <EditOutlined
                                                        fontSize="small"
                                                        className="cursor-pointer"
                                                        onClick={() => router.push(`/admin/project/edit/${item.id}`)}
                                                    />
                                                </Tooltip>
                                            }
                                            <Tooltip content="open">
                                                <OpenInNew
                                                    fontSize="small"
                                                    className="cursor-pointer"
                                                    onClick={() => router.push(`/admin/project/${item.id}`)}
                                                />
                                            </Tooltip>
                                            {props.userRole == "admin" &&
                                                <Tooltip content="delete">
                                                    <Delete
                                                        color="error"
                                                        fontSize="small"
                                                        className="cursor-pointer"
                                                        onClick={() => props.openDeleteModal(item.id, item.title, "Project")}
                                                    />
                                                </Tooltip>
                                            }
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