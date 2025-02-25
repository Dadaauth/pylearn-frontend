"use client"
import { Accordion, AccordionItem, Button, Link } from "@heroui/react";
import { DoneAll } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { RetrieveProjectsStatuses } from "@/utils/project";

export default function ProjectsAccordion() {
    const [projects, setProjects] = useState([]);

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
                            <div className="flex flex-row gap-3 justify-end">
                                <Button
                                    variant={"ghost"}
                                    color="primary"
                                    href={`/${project.id}`}
                                    as={Link}
                                >Open</Button>
                            </div>
                        </div>
                    </AccordionItem>
                );
            })}
        </Accordion>
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