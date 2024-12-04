"use client"
import { Accordion, AccordionItem, Button, Link } from "@nextui-org/react";
import { DoneAll } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { RetrieveProjectsStatuses } from "@/utils/project";

export default function ProjectsAccordion() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        async function getProjects() {
            let pjts = await fetchProjects();

            // fetch the projects statuses
            let pjts_ids = pjts.map((p: any) => p.id);
            RetrieveProjectsStatuses(pjts_ids).then((statuses) => {
                pjts = pjts.map((p: any) => {
                    p.status = statuses.filter((s: any) => s.id == p.id)[0]?.status;
                    return p;
                });
                setProjects(pjts);
            });
        }


        getProjects();
    }, [])
    type Project = {
        "id": String,
        "description": String,
        "status": String,
        "title": String,
    }
    return (
        <Accordion variant="splitted" className="my-4">
            {projects.map((project: Project) => {
                return (
                    <AccordionItem
                    // @ts-ignore
                        key={project.id}
                        aria-label={project.title}
                        title={project.title}
                        startContent={project.status == "completed" && <DoneAll color="success"/>}
                    >
                        <div className="flex flex-col gap-3">
                            {project.description}
                            <Button
                                variant={"ghost"}
                                color="primary"
                                href={`/${project.id}`}
                                as={Link}
                            >Open</Button>
                        </div>
                    </AccordionItem>
                );
            })}
        </Accordion>
    );
}
async function fetchProjects() {
    try {
        let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_V1}/project/fetch/all?q=id,title,description`);
        if (res.ok) {
            let data = (await res.json()).data
            return data;
        } else return [];
    } catch (e) {
        console.log("An error occured!!!");
        return [];
    }
    // also fetch the project status specific to a particular student
}