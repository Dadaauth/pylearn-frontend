"use client"
import React, { useEffect, useRef, useState } from "react";
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize'
import { Form, Link, Spinner } from "@heroui/react";
import CalendarViewDayOutlinedIcon from '@mui/icons-material/CalendarViewDayOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Button, Input, Alert } from "@heroui/react";
import { ReportOutlined } from "@mui/icons-material";

import { submitProject } from "./utils";
import { Project, PageData, MarkDownContent } from "./definitions";
import AppNavBar from "@/components/ui/navbar";
import ProtectedRoute from "@/components/utils/protected";
import { overrideComponents } from "@/components/utils/customComponents";
import { fetchAPIv1 } from "@/utils/api";
import LoadingPage from "@/components/ui/loadingPage";


export default function Page({
    params,
  }: {
    params: Promise<{ id: string }>
  }) {
    const [data, setData] = useState<PageData | null>(null);
    const [loading, setLoading] = useState(true);
    const fetched = useRef(false);

    useEffect(() => {
        if (fetched.current) return;
        fetched.current = true;

        fetchData(params).then((result) => {
            setData(result);
            setLoading(false);
        });
    }, [params]);

    if (loading) return <LoadingPage />
    if(!data) return <p className="text-lg">Project not found</p>

    return (
        <>
            <AppNavBar />
            <ProtectedRoute>
                <div className="mx-6">
                    <TopSection project={data.project} />
                    <MarkdownSection md={data.project.markdown_content} />
                    <ProjectSubmitSection project_id={data.project.id} />
                    <ProjectNavigationSection data={data} />
                </div>
            </ProtectedRoute>
        </>
    );
}


const fetchData = async (params: Promise<{ id: string }>) => {
    try {
        const projectID = (await params).id
        const response =  await fetchAPIv1(`/student/project/${projectID}`);
        if (response.ok)
            return (await response.json()).data;
        else return null
    } catch(_err) {
        console.log(_err);
        return null;
    }
}

function TopSection({ project }: { project: Project }) {
    return (
        <div>
            <h3 className="my-4 text-2xl font-bold text-[#3776AB]">{project.title}</h3>
            <p className="text-sm text-[#2B2D42] font-medium flex flex-row items-center gap-6"><CalendarViewDayOutlinedIcon /> Module: {project.module.title}</p>
            <p className="text-sm text-[#2B2D42] font-medium flex flex-row items-center gap-6"><AccessTimeOutlinedIcon /> Status: {project.status}</p>
            <p className="text-sm text-[#2B2D42] font-medium flex flex-row items-center gap-6"><PersonOutlineOutlinedIcon /> Author: {project.author.first_name} {project.author.last_name}</p> <br />
            <p className="text-sm text-[#2B2D42] font-medium flex flex-row items-center gap-6"><AccessTimeOutlinedIcon /> Started: {project.fa_start_date}</p>
            <p className="text-sm text-[#2B2D42] font-medium flex flex-row items-center gap-6"><AccessTimeOutlinedIcon /> Second Attempt: {project.sa_start_date}</p>
            <p className="text-sm text-[#2B2D42] font-medium flex flex-row items-center gap-6"><AccessTimeOutlinedIcon /> Ends: {project.end_date}</p>
            {project.studentProject?.grade && <p className="text-sm text-[#2B2D42] font-medium flex flex-row items-center gap-6"><ReportOutlined /> Grade: {project.studentProject.grade}</p>}
            {project.studentProject?.feedback && <p className="text-sm text-[#2B2D42] font-medium flex flex-row items-center gap-6"><ReportOutlined /> Feedback: {project.studentProject.feedback}</p>}
            <br />

            <p className="sm:max-w-xl text-[#2B2D42] font-medium text-base">{project.description}</p>
        </div>
    );
}

function MarkdownSection({ md }: { md: string }) {
    const [markdownContent, setMarkdownContent] = useState<MarkDownContent>()
    useEffect(() => {(async () => {setMarkdownContent(await serialize(md))})()}, [md])
    
    if (!markdownContent) return <Spinner />
    return (
        <MDXRemote compiledSource={markdownContent?.compiledSource || ""} components={overrideComponents} scope={markdownContent?.scope} frontmatter={markdownContent?.frontmatter} />
    );
}

function ProjectSubmitSection({ project_id }: { project_id: string }) {
    const [info, setInfo] = useState({ status: "", message: "" });

    async function handleProjectSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const data = {
            project_id,
            submission_file: formData.get("submission_file") as string,
        };
        const res = await submitProject(data);

        if (res)
            setInfo({status: "success", message: "Project Submitted Successfully!"});
        else
            setInfo({status: "fail", message: "An error occured!"});
    }

    return (
        <div className="my-4">
            <p className="text-[#2B2D42] font-medium text-base">Submit a URL to a Google Docs file here (max 300 chars):</p>
            <Form
                onSubmit={handleProjectSubmit}
                validationBehavior="native"
            >
                {info.message != "" &&
                    <Alert
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
    );
}

function ProjectNavigationSection({ data }: { data: PageData }) {
    return (
        <div className="flex flex-row justify-between mt-6">
            <Button
                as={Link}
                href={`/project/${data.project.prev_project_id}`}
                size="sm"
                className="bg-[#3776AB] text-white"
                isDisabled={!Boolean(data.prev_project)}
            >
                <ArrowBack /> Prev Project
            </Button>
            <Button
                as={Link}
                href={`/project/${data.project.next_project_id}`}
                size="sm"
                className="bg-[#3776AB] text-white"
                isDisabled={!Boolean(data.next_project)}
            >
                Next Project <ArrowForward />
            </Button>
        </div>
    );
}