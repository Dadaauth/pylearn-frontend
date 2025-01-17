"use client"
import React, { useEffect, useState } from "react";
import { MDXRemote } from 'next-mdx-remote';
import { MDXComponents } from "mdx/types";
import { serialize } from 'next-mdx-remote/serialize'
import { Form, Link, Spinner } from "@nextui-org/react";
import CalendarViewDayOutlinedIcon from '@mui/icons-material/CalendarViewDayOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Button, Input, Alert } from "@nextui-org/react";

import { Project } from "./definitions";
import { fetchProjectDetails, submitProject } from "./utils";
import AppNavBar from "@/components/ui/navbar";
import ProtectedRoute from "@/components/utils/protected";
import { CustomCODE, CustomH2, CustomLink, CustomP, CustomPRE, CustomUL } from "./customComponents";

const overrideComponents: MDXComponents = {
    h2: (props) => <CustomH2 {...props}>{props.children}</CustomH2>,
    p: (props) => <CustomP {...props}>{props.children}</CustomP>,
    ul: (props) => <CustomUL {...props}>{props.children}</CustomUL>,
    a: (props) => <CustomLink {...props} href={props.href || "#"}>{props.children}</CustomLink>,
    code: (props) => <CustomCODE {...props}>{props.children}</CustomCODE>,
    pre: (props) => <CustomPRE {...props}>{props.children}</CustomPRE>,
}

export default function Page({
    params,
  }: {
    params: Promise<{ id: string }>
  }) {
    const [info, setInfo] = useState({
        status: "",
        message: ""
    });
    const [project, setProject] = useState<Project>({
        id: "",
        title: "",
        description: "",
        status: "",
        module: "",
        author: "",
        next_project: {
            id: "",
            status: "",
        },
        prev_project: {
            id: "",
            status: "",
        },
    });
    const [markdownContent, setMarkdownContent] = useState<{ compiledSource?: string | undefined; scope?: Record<string, unknown> | undefined; frontmatter?: Record<string, unknown> | undefined; }>()

    useEffect(() => {
        async function fetchData() {
            const project_id = (await params).id
            const pjt = await fetchProjectDetails(project_id);

            let next_pjt = await fetchProjectDetails(pjt.next_project_id);
            let prev_pjt = await fetchProjectDetails(pjt.prev_project_id);

            let id = pjt.id;
            let title = pjt.title;
            let description = pjt.description;
            setMarkdownContent(await serialize(pjt.markdown_content));
            let status = pjt.status
            let module = pjt.module;
            let author = pjt.author;
            let next_project = {
                id: next_pjt.id,
                status: next_pjt.status,
            };
            let prev_project = {
                id: prev_pjt.id,
                status: prev_pjt.status,
            };
            setProject({id, title, description, status, module, author, next_project, prev_project});
        }

        fetchData();
    }, [])

    async function handleProjectSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const data = {
            project_id: project.id as string,
            submission_file: formData.get("submission_file") as string,
        };
        const res = await submitProject(data);
        if (res)
            setInfo({status: "success", message: "Project Submitted Successfully!"});
        else
            setInfo({status: "fail", message: "An error occured!"});
    }

    return (
        <>
            <AppNavBar />
            <ProtectedRoute>
                <div className="mx-6">
                    <div className="my-6">
                        <h3 className="my-4 text-2xl font-bold text-[#3776AB]">{project.title}</h3>
                        <p className="text-sm text-[#2B2D42] font-medium flex flex-row items-center gap-6"><CalendarViewDayOutlinedIcon /> Module: {project.module}</p>
                        <p className="text-sm text-[#2B2D42] font-medium flex flex-row items-center gap-6"><AccessTimeOutlinedIcon /> Status: {project.status}</p>
                        <p className="text-sm text-[#2B2D42] font-medium flex flex-row items-center gap-6"><PersonOutlineOutlinedIcon /> Author: {project.author}</p>
                        <br />

                        <p className="sm:max-w-xl text-[#2B2D42] font-medium text-base">{project.description}</p>

                        {markdownContent?.compiledSource ? <MDXRemote compiledSource={markdownContent.compiledSource} components={overrideComponents} scope={markdownContent.scope} frontmatter={markdownContent.frontmatter} /> : <Spinner />}

                        <div className="my-4">
                            <p className="text-[#2B2D42] font-medium text-base">Submit a URL to a Google Docs file here (max 300 chars):</p>
                            <Form
                                onSubmit={handleProjectSubmit}
                                validationBehavior="native"
                            >
                                {info.message != "" &&
                                    <Alert
                                        type={info.status}
                                        color={info.status === "success" ? "success" : "danger"}
                                        title={info.message}
                                        classNames={{
                                            "base": "max-w-md",
                                        }}
                                    />
                                }
                                <div className="max-w-xl w-full flex flex-row gap-3 items-center">
                                    <Input
                                        type="url"
                                        name="submission_file"
                                        placeholder="https://"
                                        defaultValue="https://"
                                        maxLength={300}
                                        isRequired
                                    />
                                    <Button
                                        className="bg-[#2EC4B6] text-white"
                                        type="submit"
                                    >
                                        Submit
                                    </Button>
                                </div>
                            </Form>
                        </div>
                        <div className="flex flex-row justify-between mt-6">
                            <Button
                                as={Link}
                                href={`/project/${project.prev_project.id}`}
                                size="sm"
                                className="bg-[#3776AB] text-white"
                                isDisabled={!(Boolean(project.prev_project.id) && (project.prev_project.status != "locked"))}
                            >
                                <ArrowBack /> Prev Project
                            </Button>
                            <Button
                                as={Link}
                                href={`/project/${project.next_project.id}`}
                                size="sm"
                                className="bg-[#3776AB] text-white"
                                isDisabled={!(Boolean(project.next_project.id) && (project.next_project.status != "locked"))}
                            >
                                Next Project <ArrowForward />
                            </Button>
                        </div>
                    </div>
                </div>
            </ProtectedRoute>
        </>
    );
}