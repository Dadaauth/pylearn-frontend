"use client"
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

import { fetchProjects } from "../../../projects/utils";
import { Module, Projects, Project } from "./definitions";
import React from "react";

export async function updateCurrentProject(project_id: string, setCurrentProject: React.Dispatch<React.SetStateAction<Project>>) {
    const pjt = await fetchProject(project_id);
    setCurrentProject(pjt);
    return pjt;
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