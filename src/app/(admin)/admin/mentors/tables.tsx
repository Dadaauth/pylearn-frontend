"use client"
import { useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Select, SelectItem, SharedSelection } from "@heroui/react";
import { Check } from "@mui/icons-material";

import { Cohort, Mentor, PageData } from "./definitions";
import { fetchAPIv1 } from "@/utils/api";


export function MentorsTable({ data }: { data: PageData }) {
    return (
        <div className="my-6">
            <Table aria-label="Mentors Table">
                <TableHeader>
                    <TableColumn>Name</TableColumn>
                    <TableColumn>Email</TableColumn>
                    <TableColumn>Assigned Cohorts</TableColumn>
                </TableHeader>
                <TableBody>
                    {data.mentors.map((mentor) => (
                        <TableRow key={mentor.id}>
                            <TableCell>{mentor.first_name} {mentor.last_name}</TableCell>
                            <TableCell>{mentor.email}</TableCell>
                            <TableCell>
                                <AssignedCohortsSelection
                                    all_cohorts={data.cohorts}
                                    mentor={mentor}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}


function AssignedCohortsSelection({all_cohorts, mentor}: {all_cohorts: Cohort[], mentor: Mentor}) {
    const [cohortsAssigned, setCohortsAssigned] = useState<string[]>(mentor.cohorts.map((cohort) => cohort.id));
    const [isLoading, setIsLoading] = useState(false);
    

    function setNewAssignedCohorts(keys: SharedSelection) {
        const selectedCohorts = new Set<string>(keys as unknown as string[]);
        setCohortsAssigned(Array.from(selectedCohorts));
    }

    async function updateAssignedCohorts() {
        setIsLoading(true);
        try {
            const res = await fetchAPIv1("/admin/mentors", undefined, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ cohorts: cohortsAssigned, mentor_id: mentor.id }),
            });

            if (res.ok) console.log("Cohorts assigned successfully");
            else console.log("An error occured when assigning cohorts");
        } catch {
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
                {all_cohorts.map((cohort) => (
                    <SelectItem key={cohort.id}>{`${cohort.name} - ${cohort.course.title}`}</SelectItem>
                ))}
            </Select>
            <Button isLoading={isLoading} onPress={updateAssignedCohorts} variant="shadow" color="primary" isIconOnly><Check /></Button>
        </div>
    );
}