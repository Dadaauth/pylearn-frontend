"use client"
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Select, SelectItem } from "@heroui/react";
import { Check } from "@mui/icons-material";

import { Mentors, Cohort } from "./definitions";
import { fetchAllCohorts, fetchCohortsAssignedToMentor, fetchMentors } from "./utils";


export function MentorsTable() {
    const [mentors, setMentors] = useState<Mentors[]>([]);
    const [cohorts, setCohorts] = useState<Cohort[]>([]);

    useEffect(() => {
        async function fetchData() {
            const mtr = await fetchMentors();
            if (mtr) setMentors(mtr);

            const tmp_cohorts = await fetchAllCohorts();
            if (tmp_cohorts) setCohorts(tmp_cohorts);
        }

        fetchData();
    }, [])

    return (
        <div className="my-6">
            <Table aria-label="Mentors Table">
                <TableHeader>
                    <TableColumn>Name</TableColumn>
                    <TableColumn>Email</TableColumn>
                    <TableColumn>Assigned Cohorts</TableColumn>
                </TableHeader>
                <TableBody>
                    {mentors.map((mentor, index) => (
                        <TableRow key={index}>
                            <TableCell>{mentor.first_name} {mentor.last_name}</TableCell>
                            <TableCell>{mentor.email}</TableCell>
                            <TableCell>
                                <AssignedCohortsSelection
                                    cohorts={cohorts}
                                    mentor_id={mentor.id}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}


function AssignedCohortsSelection({mentor_id, cohorts}: {mentor_id: string, cohorts: Cohort[]}) {
    const [cohortsAssigned, setCohortsAssigned] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
        async function fetchData() {
            const tmp_cohorts_assigned = await fetchCohortsAssignedToMentor(mentor_id);
            if (tmp_cohorts_assigned) {
                const tmp_list = [];
                for (const tmp of tmp_cohorts_assigned) {
                    tmp_list.push(tmp.id)
                }
                setCohortsAssigned(tmp_list);
            }
        }

        fetchData();
    }, []);

    function setNewAssignedCohorts(selectedCohorts: any) {
        setCohortsAssigned(Array.from(selectedCohorts));
    }

    async function updateAssignedCohorts() {
        setIsLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_V1}/cohort/assign_mentor`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Cookies.get("access_token")}`
                },
                body: JSON.stringify({cohorts: cohortsAssigned, mentor_id}),
            });

            if (res.ok) {
                console.log("Cohorts assigned successfully");
            } else {
                console.log("An error occured when assigning cohorts");
            }
        } catch(err) {
            console.log("An error occured when assigning cohorts");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex flex-row gap-3 justify-center items-center">
            <Select
                label="Assigned Cohorts"
                selectedKeys={cohortsAssigned}
                selectionMode="multiple"
                onSelectionChange={setNewAssignedCohorts}
            >
                {cohorts.map((cohort) => (
                    <SelectItem key={cohort.id}>{`${cohort.name} - ${cohort.course.title}`}</SelectItem>
                ))}
            </Select>
            <Button isLoading={isLoading} onPress={updateAssignedCohorts} variant="shadow" color="primary" isIconOnly><Check /></Button>
        </div>
    );
}