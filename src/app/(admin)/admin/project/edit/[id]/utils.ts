"use client"
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

import { fetchProjects } from "../../../projects/utils";
import { Module, Projects, Project } from "./definitions";
import React from "react";

export async function updateCurrentProject(project_id: string, setCurrentProject: React.Dispatch<React.SetStateAction<Project>>) {
    const pjt = await fetchProject(project_id);
    let id = pjt.id;
    let title = pjt.title;
    let module_id = pjt.module_id;
    let description = pjt.description;
    let markdown_content = pjt.markdown_content;
    let status = pjt.status;
    let prev_project_id = pjt.prev_project_id;

    let project = {
        id, title, module_id, description,
        markdown_content, status, prev_project_id
    }
    setCurrentProject(project);
    return project;
}

export function handleModuleSelectionChange(e: React.ChangeEvent<HTMLSelectElement>, modules: Module[], setProjects: React.Dispatch<React.SetStateAction<Projects[]>>) {
    for (let i = 0; i < modules.length; i++) {
        if (modules[i].key == e.target.value) {
            setProjects(modules[i].projects);
            break;
        }
    }
}

export async function fetchProject(project_id: string) {

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_V1}/project/${project_id}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${Cookies.get("access_token")}`
            }
        });

        if (res.ok) {
            return (await res.json()).data.project
        } else {
            return {
                id: "",
                title: "",
                module_id: "",
                description: "",
                markdown_content: "",
                status: "",
                prev_project_id: "",
            }
        }
    } catch(err) {
        return {
            id: "",
            title: "",
            module_id: "",
            description: "",
            markdown_content: "",
            status: "",
            prev_project_id: "",
        }
    }
}