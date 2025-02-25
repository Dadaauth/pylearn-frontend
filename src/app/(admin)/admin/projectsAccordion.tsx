"use client"
import { Accordion, AccordionItem, Button, Link } from "@heroui/react";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@heroui/react";
import {Form, Input} from "@heroui/react";
import { DoneAll } from "@mui/icons-material";
import { FormEvent, useEffect, useState } from "react";
import { RetrieveProjectsStatuses } from "@/utils/project";

export default function ProjectsAccordion() {
    const [projects, setProjects] = useState([]);
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    useEffect(() => {
        async function getProjects() {
            let pjts = await fetchProjects();

            // fetch the projects statuses
            // @ts-expect-error This is just necessary
            const pjts_ids = pjts.map((p) => p.id);
            RetrieveProjectsStatuses(pjts_ids).then((statuses) => {
                // @ts-expect-error This is just necessary
                pjts = pjts.map((p) => {
                    p.status = statuses.filter((s: {
                        "id": string,
                        "description": string,
                    }) => s.id == p.id)[0]?.status;
                    return p;
                });
                setProjects(pjts);
            });
        }


        getProjects();
    }, [])
    type Project = {
        "id": string,
        "description": string,
        "status": string,
        "title": string,
    }
    return (
        <Accordion variant="splitted" className="mt-8 md:ml-20 md:max-w-[50%]">
            {projects.map((project: Project) => {
                return (
                    <AccordionItem
                        key={project.id}
                        aria-label={project.title}
                        title={project.title}
                        startContent={project.status == "completed" && <DoneAll color="success"/>}
                    >
                        <div className="flex flex-col gap-3">
                            {project.description}
                            <div className="flex flex-row justify-end gap-3">
                                <Button
                                    variant={"ghost"}
                                    color="primary"
                                    href={`/${project.id}`}
                                    as={Link}
                                >Open</Button>
                                <Button
                                    variant={"ghost"}
                                    color="success"
                                    href={`/project/edit/${project.id}`}
                                    as={Link}
                                >Edit</Button>
                                <Button
                                    variant={"ghost"}
                                    color="danger"
                                    onPress={onOpen}
                                >Delete</Button>
                            </div>
                        </div>
                        <DeleteConfirmationModal
                            ActualProjectID={project.id}
                            isOpen={isOpen}
                            onOpenChange={onOpenChange}
                        />
                    </AccordionItem>
                );
            })}
        </Accordion>
    );
}

function DeleteConfirmationModal({ ActualProjectID, isOpen, onOpenChange }:{
    ActualProjectID: string,
    isOpen: any,
    onOpenChange: any,
}) {
    const [projectID, setProjectID] = useState("");

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = Object.fromEntries(new FormData(e.currentTarget));

    }
    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader><p className="">Deletion Confirmation</p></ModalHeader>
                        <ModalBody>
                            <p>Are you sure you want to delete this project?</p>
                            <p className="text-xs">Enter project ID &#40;<span className="text-red-400">{ActualProjectID}</span>&#41; to delete:</p>
                            <Form onSubmit={onSubmit} validationBehavior="native">
                                <div className="flex flex-row gap-4 items-end w-full">
                                    <Input
                                        isRequired
                                        label="Project ID"
                                        labelPlacement="outside"
                                        name="projectID"
                                        placeholder="Enter the Project ID"
                                        type="text"
                                        value={projectID}
                                        onValueChange={setProjectID}
                                        validate={(value) => {
                                            if (value != ActualProjectID) {
                                                return "Invalid project ID";
                                            }
                                            return null;
                                        }}
                                    />
                                    <Button color="danger" type="submit">Submit</Button>
                                </div>
                            </Form>
                        </ModalBody>
                    </>
                )}
                </ModalContent>
            </Modal>
        </>
    );
}
async function fetchProjects() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_V1}/project/fetch/all?q=id,title,description`);
        if (res.ok) {
            const data = (await res.json()).data
            return data;
        } else return [];
    } catch (e) {
        console.error("An error occured!!!", e);
        return [];
    }
}