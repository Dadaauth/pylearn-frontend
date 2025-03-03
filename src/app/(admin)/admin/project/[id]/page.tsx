"use client"
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MDXRemote } from 'next-mdx-remote';

import { serialize } from 'next-mdx-remote/serialize'
import { Link, Spinner, Tooltip } from "@heroui/react";
import CalendarViewDayOutlinedIcon from '@mui/icons-material/CalendarViewDayOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { ArrowBack, ArrowForward, EditOutlined } from "@mui/icons-material";
import { Button } from "@heroui/react";

import { PageData, Project, MarkDownContent } from "./definitions";
import { fetchData } from "./utils";
import AppNavBar from "@/components/ui/navbar";
import ProtectedAdmin from "@/components/utils/ProtectedAdmin";
import LoadingPage from "@/components/ui/loadingPage";
import { overrideComponents } from "@/components/utils/customComponents";
import { siteconfig } from "@/app/siteconfig";


export default function Page({
    params,
  }: {
    params: Promise<{ id: string }>
  }) {
    const [data, setData] = useState<PageData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData(params).then((result) => {
            setData(result);
            setLoading(false);
        });
    }, [params])

    if (loading) return <LoadingPage />
    if(!data) return <p className="text-lg">Project not found</p>

    return (
        <>
            <AppNavBar />
            <ProtectedAdmin>
                <div className="mx-6">
                    <div className="my-6">
                        <TopSection project={data.project} />
                        <MarkdownSection md={data.project.markdown_content} />
                        <ProjectNavigationSection data={data} />
                    </div>
                </div>
            </ProtectedAdmin>
        </>
    );
}


function TopSection({ project }: { project: Project }) {
    const router = useRouter();
    return (
        <div>
            <h3 className="my-4 text-2xl font-bold text-[#3776AB] flex items-center gap-3">
                {project.title}
                <Tooltip content="edit project">
                    <EditOutlined
                        fontSize="small"
                        className="cursor-pointer"
                        onClick={() => router.push(`${siteconfig.navigation.urls.admin.pages.project.edit}/${project.id}`)}
                    />
                </Tooltip>
            </h3>
            <p className="text-sm text-[#2B2D42] font-medium flex flex-row items-center gap-6"><CalendarViewDayOutlinedIcon /> Module: {project.module.title}</p>
            <p className="text-sm text-[#2B2D42] font-medium flex flex-row items-center gap-6"><AccessTimeOutlinedIcon /> Status: {project.status}</p>
            <p className="text-sm text-[#2B2D42] font-medium flex flex-row items-center gap-6"><PersonOutlineOutlinedIcon /> Author: {project.author.first_name} {project.author.last_name}</p> <br />
            <p className="text-sm text-[#2B2D42] font-medium flex flex-row items-center gap-6"><AccessTimeOutlinedIcon /> Started: {project.fa_start_date}</p>
            <p className="text-sm text-[#2B2D42] font-medium flex flex-row items-center gap-6"><AccessTimeOutlinedIcon /> Second Attempt: {project.sa_start_date}</p>
            <p className="text-sm text-[#2B2D42] font-medium flex flex-row items-center gap-6"><AccessTimeOutlinedIcon /> Ends: {project.end_date}</p>
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

function ProjectNavigationSection({ data }: { data: PageData }) {
    return (
        <div className="flex flex-row justify-between mt-6">
            <Button
                as={Link}
                href={`/admin/project/${data.project.prev_project_id}`}
                size="sm"
                className="bg-[#3776AB] text-white"
                isDisabled={!Boolean(data.prev_project)}
            >
                <ArrowBack /> Prev Project
            </Button>
            <Button
                as={Link}
                href={`/admin/project/${data.project.next_project_id}`}
                size="sm"
                className="bg-[#3776AB] text-white"
                isDisabled={!Boolean(data.next_project)}
            >
                Next Project <ArrowForward />
            </Button>
        </div>
    );
}