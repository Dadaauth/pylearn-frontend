"use client"
import { Accordion, AccordionItem, Button, Link } from "@nextui-org/react";
import { DoneAll } from "@mui/icons-material";
import { useEffect, useState } from "react";

export default function ProjectsAccordion() {
    const [projects, setProjects] = useState([]);
    // const projects = [
    //     {
    //         "title": "Python | Setting up",
    //         "id": 0,
    //         "description": "Learn how to set up your Python development environment, including installing Python and setting up a code editor.",
    //         "status": "done",
    //     },
    //     {
    //         "title": "Python Basics",
    //         "id": "1",
    //         "description": "An introduction to Python programming covering basic syntax, data types, and simple operations.",
    //         "status": "pending",
    //     },
    //     {
    //         "title": "Python conditionals",
    //         "id": "2",
    //         "description": "Understand how to use conditional statements in Python to control the flow of your programs.",
    //         "status": "pending",
    //     }
    // ]
    useEffect(() => {
        async function getProjects() {
            setProjects(await fetchProjects())
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
                        startContent={project.status == "done" && <DoneAll color="success"/>}
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
        let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_V1}/project/fetch?q=id,title,description`);
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