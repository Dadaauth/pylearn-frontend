import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Select, SelectItem } from "@heroui/react";
import { Check } from "@mui/icons-material";

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
                </TableHeader>
                <TableBody>
                    {mentors.map((mentor, index) => (
                        <TableRow key={index}>
                            <TableCell>{mentor.first_name} {mentor.last_name}</TableCell>
                            <TableCell>{mentor.email}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}