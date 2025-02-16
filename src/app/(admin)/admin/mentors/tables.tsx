import { useState, useEffect } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from "@nextui-org/react";

import { Mentors } from "./definitions";
import { fetchMentors } from "./utils";


export function MentorsTable() {
    const [mentors, setMentors] = useState<Mentors[]>([]);

    useEffect(() => {
        async function fetchData() {
            const mtr = await fetchMentors();
            if (mtr) setMentors(mtr);
        }
        fetchData();
    }, [])

    return (
        <div className="my-6">
            <Table aria-label="Mentors Table">
                <TableHeader>
                    <TableColumn>Name</TableColumn>
                    <TableColumn>Email</TableColumn>
                    <TableColumn>Status</TableColumn>
                    <TableColumn>Actions</TableColumn>
                </TableHeader>
                <TableBody>
                    {mentors.map((mentor, index) => (
                        <TableRow key={index}>
                            <TableCell>{mentor.first_name} {mentor.last_name}</TableCell>
                            <TableCell>{mentor.email}</TableCell>
                            <TableCell>{mentor.status}</TableCell>
                            <TableCell>
                                <Button className="bg-[#F94144] text-white">
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}