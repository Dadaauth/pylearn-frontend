"use client"
import AppNavBar from "@/components/ui/navbar";
import ProtectedRoute from "@/components/utils/protected";
import CalendarViewDayOutlinedIcon from '@mui/icons-material/CalendarViewDayOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Button, Code, Input, Snippet } from "@heroui/react";
import Link from "next/link";

export default function Page({
    params,
  }: {
    params: Promise<{ id: string }>
  }) {

    return (
        <>
            <AppNavBar />
            <ProtectedRoute>
                <div className="mx-6">
                    <div className="my-6">
                        <h3 className="my-4 text-2xl font-bold text-[#3776AB]">Variables and Data Types</h3>
                        <p className="text-sm text-[#2B2D42] font-medium flex flex-row items-center gap-6"><CalendarViewDayOutlinedIcon /> Module: Introduction to Python</p>
                        <p className="text-sm text-[#2B2D42] font-medium flex flex-row items-center gap-6"><AccessTimeOutlinedIcon /> Status: Completed</p>
                        <p className="text-sm text-[#2B2D42] font-medium flex flex-row items-center gap-6"><PersonOutlineOutlinedIcon /> Author: Lionel Luthor</p>
                        <br />
                        {/* Description */}
                        <p className="sm:max-w-xl text-[#2B2D42] font-medium text-base">
                            This is a project that will introduce you to the basics of programming in Python.
                            You will get the oppourtunity to learn topics about variables which store information
                            in our programs and Data types which are the methods in which we can store those information.
                        </p>
                        {/* Description End */}

                        {/* Markdown Content */}
                        <p>

                        </p>
                        {/* Markdown Content End */}

                        <section>
                            <h4 className="my-4 text-xl font-bold text-[#3776AB]">Resources</h4>
                            <p className="text-small text-[#2B2D42] font-medium max-w-xl">
                                Study these resources to complete the tasks below.
                                Make sure to practice the code samples you find to
                                get yourself more familiar with the topic
                            </p>
                            <ul className="mt-4 text-small text-[#2B2D42] font-medium max-w-xl list-disc list-inside">
                                <li className="hover:underline"><Link href="https://python.introduction.tech">Introduction To Python</Link></li>
                                <li className="hover:underline"><Link href="https://python.introduction.tech">Variables in Programming</Link></li>
                                <li className="hover:underline"><Link href="https://python.introduction.tech">How variables are stored in Python</Link></li>
                                <li className="hover:underline"><Link href="https://python.introduction.tech">Data Types in Python</Link></li>
                            </ul>
                        </section>

                        <section>
                            <h4 className="my-4 text-xl font-bold text-[#3776AB]">Instructions</h4>
                            <p className="text-small text-[#2B2D42] font-medium max-w-md">
                                
                            </p>
                            <ul className="mt-4 text-small text-[#2B2D42] font-medium max-w-xl list-disc list-inside">
                                {/* <li></li> */}
                            </ul>
                        </section>

                        <section>
                            <h4 className="my-4 text-xl font-bold text-[#3776AB]">Tasks</h4>
                            <p className="text-small text-[#2B2D42] font-medium max-w-xl">
                                Complete the Tasks Below:
                            </p>
                            <div className="mt-4 text-small text-[#2B2D42] font-medium max-w-xl">
                                <h5 className="text-lg my-2 font-bold text-[#3776AB]">1. Test Your Variables Knowledge</h5>
                                <p>
                                    In a new python file, create two variables x and y and assign 26 and 29 as their values
                                    respectively. Then output their values in the form:
                                </p>
                                <Code>
                                    x: 26
                                    y: 29
                                </Code>
                                <br />
                                Example Output:<br/>
                                <Snippet>
                                    <span>x: 26</span>
                                    <span>y: 29</span>
                                </Snippet>
                            </div>
                        </section>

                        <div className="my-4">
                            <p className="text-[#2B2D42] font-medium text-base">Submit a URL to a Google Docs file here:</p>
                            <div className="max-w-xl flex flex-row gap-3 items-center">
                                <Input
                                    type="url"
                                    name="submission_file"
                                    placeholder="https://"
                                    defaultValue="https://"
                                />
                                <Button
                                    className="bg-[#2EC4B6] text-white"
                                    type="submit"
                                >
                                    Submit
                                </Button>
                            </div>
                        </div>
                        <div className="flex flex-row justify-between mt-6">
                            <Button size="sm" className="bg-[#3776AB] text-white"><ArrowBack /> Prev Project</Button>
                            <Button size="sm" className="bg-[#3776AB] text-white">Next Project <ArrowForward /></Button>
                        </div>
                    </div>
                </div>
            </ProtectedRoute>
        </>
    );
}