"use client"
import { useEffect, useState } from "react";
import { Button, Form, Input, Modal, ModalBody, ModalContent, ModalHeader, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Textarea, useDisclosure } from "@heroui/react";
import { Alert, Select, SelectItem } from "@heroui/react";
import Cookies from "js-cookie";

import AppNavBar from "@/components/ui/navbar";
import ProtectedMentor from "@/components/utils/protectedMentor";
import { generateStudentSubmission, i_RefreshSubmissionTable, retrieve_projects_with_submissions } from "./utils";
import { Project, StudentSubmissions } from "./definitions";
import Link from "next/link";


export default function Page() {
    const [isGenerating, setIsGenerating] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [projectsWithSubmissions, setProjectsWithSubmission] = useState<Project[]>([]);
    const [studentsSubmissionData, setStudentsSubmissionData] = useState<StudentSubmissions[]>([]);
    const [selectedProjectID, setSelectedProjectID] = useState<string>();
    const [info, setInfo] = useState<string | null>();

    useEffect(() => {
        async function fetchData() {
            const pjts = await retrieve_projects_with_submissions();
            const projects = [];
            for (let i = 0; i < pjts.length; i++) {
                const id = pjts[i].id;
                const title = pjts[i].title;
                const description = pjts[i].description;
                projects.push({id, title, description});
            }
            setProjectsWithSubmission(projects);
        }

        fetchData();
    }, [])

    async function generateSubmission() {
        if (!selectedProjectID)
            return
        setIsGenerating(true);


        const res = await generateStudentSubmission(selectedProjectID);
        if (res == true)
            setInfo("Generation Successful!")
        else if (typeof(res) == "string")
            setInfo(res);
        else
            setInfo("An error Occured!")

        setTimeout(() => setInfo(null), 3000)
        setIsGenerating(false);
    }

    async function refreshSubmissionTable() {
        if (!selectedProjectID)
            return
        setIsRefreshing(true);

        const res = await i_RefreshSubmissionTable(selectedProjectID)

        if (res) {
            const project_title = res.project.title;
            const entries = [];
            for (let i = 0; i < res.data.length; i++) {
                const student_name = `${res.data[i].student.first_name} ${res.data[i].student.last_name}`;
                const submission_date = res.data[i].student_project.submitted_on;
                const submission_file = res.data[i].student_project.submission_file;
                const student_project_id = res.data[i].student_project.id;
                entries.push({project_title, student_name, submission_date, submission_file, student_project_id})
            }
            setStudentsSubmissionData(entries);
        }
        setIsRefreshing(false)
    }

    return (
        <>
            <AppNavBar />
            <ProtectedMentor>
                <div className="mx-6">
                    <Select
                        size="sm"
                        className="max-w-xs max-h-svh mb-3"
                        items={projectsWithSubmissions}
                        aria-label="Project With Submissions"
                        placeholder="Select a project"
                        onChange={(e) => setSelectedProjectID(e.target.value)}
                    >
                        {(project) => <SelectItem>{project.title}</SelectItem>}
                    </Select>
                    {info && <Alert
                        title={info}
                    />}
                    <div className="flex flex-row gap-6 mb-3">
                        <Button
                            className="bg-[#3776AB] text-white"
                            onPress={generateSubmission}
                            isLoading={isGenerating}
                            size="sm"
                        >
                            Generate
                        </Button>
                        <Button
                            className="bg-[#3776AB] text-white"
                            onPress={refreshSubmissionTable}
                            isLoading={isRefreshing}
                            size="sm"
                        >
                            Refresh
                        </Button>
                        {selectedProjectID != '' &&
                            <Button
                                className="bg-[#3776AB] text-white"
                                as={Link}
                                href={`/mentor/project/${selectedProjectID}`}
                                size="sm"
                            >
                                View Project
                            </Button>
                        }
                    </div>
                    <ProjectSubmissionsTable data={studentsSubmissionData} />
                </div>
            </ProtectedMentor>
        </>
    );
}


function ProjectSubmissionsTable(props: {
    data: StudentSubmissions[]
}) {
    const  {onOpen, isOpen, onOpenChange} = useDisclosure();
    const [selectedProjectData, setSelectedProjectData] = useState({
        student_project_id: "",
        student_name: "",
    })

    function gradeProjectHandler(data: StudentSubmissions) {
        setSelectedProjectData({
            student_project_id: data.student_project_id,
            student_name: data.student_name,
        });
        onOpen();
    }
    return (
        <>
            <Table aria-label="Table containing project submissions for students">
                <TableHeader>
                    <TableColumn>Name Of Student</TableColumn>
                    <TableColumn>Project Title</TableColumn>
                    <TableColumn>Date Submitted</TableColumn>
                    <TableColumn>Action</TableColumn>
                </TableHeader>
                <TableBody emptyContent={"No Projects Available"}>
                    {props.data?.map((data) => {
                        return (
                            <TableRow key={data.student_project_id}>
                                <TableCell>{data.student_name}</TableCell>
                                <TableCell>{data.project_title}</TableCell>
                                <TableCell>{data.submission_date}</TableCell>
                                <TableCell className="flex flex-row gap-4">
                                    <Button as={Link} href={data.submission_file} target="_blank" size="sm" className="bg-[#3776AB] text-white px-2 py-1 rounded-md">View</Button>
                                    <Button size="sm" onPress={() => gradeProjectHandler(data)} className="bg-[#3776AB] text-white px-2 py-1 rounded-md">Grade</Button>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
            <GradeProjectModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                projectData={selectedProjectData}
            />
        </>
    );
}

// @ts-expect-error fix later
function GradeProjectModal({isOpen, onOpenChange, projectData}) {
    const [gradeButtonLoading, setGradeButtonLoading] = useState(false);
    const [info, setInfo] = useState<{
        message: string;
        type: "success" | "danger" | "default" | "primary" | "secondary" | "warning" | undefined;
    }>({
        message: "",
        type: undefined
    });

    async function submitGrade(e:  React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setGradeButtonLoading(true);
        const form = e.currentTarget as HTMLFormElement;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        data.student_project_id = projectData.student_project_id;
        console.log(data);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_V1}/project/grade`, {
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${Cookies.get("access_token")}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            })
    
            if (res.ok) setInfo({type: "success", message: "Grading Successful!"})
            else setInfo({type: "danger", message: "An error Occured!"});
        } catch {
            setInfo({type: "danger", message: "An error Occured!"});
        } finally {
            setGradeButtonLoading(false);
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
        >
            <ModalContent>
                {() => (
                    <>
                        <ModalHeader>Grade {projectData.student_name}</ModalHeader>
                        <ModalBody>
                            {info.message != "" &&
                                <Alert
                                    color={info.type}
                                    title={info.message}
                                />
                            }
                            <Form
                                onSubmit={submitGrade}
                                validationBehavior="native"
                            >
                                <Input name="grade" label="Grade" type="number" isRequired/>
                                <Textarea label="Feedback" name="feedback" />
                                <Button isLoading={gradeButtonLoading} type="submit" className="bg-[#3776AB] text-white self-end">Submit</Button>
                            </Form>
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}