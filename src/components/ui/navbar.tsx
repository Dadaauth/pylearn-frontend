"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Cookies from "js-cookie";
import { Avatar, Button, Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, useDisclosure } from "@nextui-org/react";
import { Star, Circle } from "@mui/icons-material";
import MenuIcon from '@mui/icons-material/Menu';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { Logout } from "@mui/icons-material";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { Laptop } from "@mui/icons-material";

import { siteconfig } from "@/app/siteconfig";

export default function AppNavBar() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [username, setUsername] = useState("undefined")
    const router = useRouter();
    const currentPath = usePathname();
    const userRole = Cookies.get("role");

    useEffect(() => {
        setUsername(`${Cookies.get("first_name")} ${Cookies.get("last_name")}`)
    }, [])

    function logout() {
        let cookies = Cookies.get()
        for (let cookie in cookies)
            Cookies.remove(cookie);
        router.push("/auth/login")
    }

    return (
        <nav className="bg-[#3776AB] min-h-14 flex items-center px-6 mb-6">
            <header className="flex flex-row w-full justify-between">
                <div className="flex flex-row gap-3 items-center">
                    <MenuIcon
                     className="text-white cursor-pointer hover:bg-[#2b2d4233] rounded-full p-1"
                     fontSize="large"
                     onClick={onOpen}
                    />
                    <p className="text-white font-bold">pylearn</p>
                </div>
                <div className="flex flex-row gap-6">
                    <div className="bg-[#FAFAFA] border-1 border-[#2EC4B6] flex flex-row rounded-[10px] px-2 py-1 gap-3 text-sm">
                        <p className="flex flex-row items-center gap-1">
                            0
                            <Circle
                                htmlColor="#AE1414"
                                fontSize="small"
                            />
                        </p>
                        <p className="flex flex-row items-center gap-1">
                            0
                            <Star
                                htmlColor="#2EC4B6"
                                fontSize="small"
                            />
                        </p>
                    </div>
                    {username && <Avatar
                        name={username}
                        size="sm"
                    />}
                </div>
            </header>

            <Drawer
                isOpen={isOpen}
                placement="left"
                onOpenChange={onOpenChange}
                size="xs"
                classNames={{
                    base: "bg-[#FAFAFA]"
                }}
            >
                <DrawerContent>
                    {(onClose) => (
                        <>
                            <DrawerHeader>Menu</DrawerHeader>
                            <DrawerBody>
                                <div className="flex flex-col gap-8 mt-6">
                                    <DrawerItem
                                        title="Home"
                                        link="/"
                                        icon={HomeOutlinedIcon}
                                        active={currentPath == '/'}
                                    />
                                    <DrawerItem
                                        title="Projects"
                                        link={(userRole == "admin" || userRole == "mentor")? "/admin/projects": "/projects"}
                                        icon={CalendarTodayIcon}
                                        active={currentPath == ((userRole == "admin" || userRole == "mentor")? '/admin/projects': "/projects")}
                                    />
                                    {userRole == "admin" &&
                                        <DrawerItem
                                            title="Mentors"
                                            link={siteconfig.navigation.urls.admin_view_mentors}
                                            icon={Laptop}
                                            active={currentPath == siteconfig.navigation.urls.admin_view_mentors}
                                        />
                                    }
                                    {(userRole == "admin" || userRole == "mentor") &&
                                        <>
                                            <DrawerItem
                                                title="Students"
                                                link={siteconfig.navigation.urls.view_students_page}
                                                icon={Laptop}
                                                active={currentPath == siteconfig.navigation.urls.view_students_page}
                                            />
                                        </>
                                    }
                                    {userRole == "mentor" &&
                                        <>
                                            <DrawerItem
                                                title="Submissions"
                                                link={siteconfig.navigation.urls.mentor_projectsubmissions_page}
                                                icon={Laptop}
                                                active={currentPath == siteconfig.navigation.urls.mentor_projectsubmissions_page}
                                            />
                                        </>
                                    }
                                </div>
                            </DrawerBody>
                            <DrawerFooter>
                                <Button
                                    className="self-end bg-[#3776AB] text-white max-w-sm"
                                    onPress={logout}
                                >
                                    Logout
                                    {<Logout
                                        fontSize="medium"
                                    />}
                                </Button>
                            </DrawerFooter>
                        </>
                    )}
                </DrawerContent>
            </Drawer>
        </nav>
    );
}

function DrawerItem(props: {
    link: string,
    title: string,
    // @ts-expect-error
    icon: Any
    // To dertermine if to show a background color or not
    active?: boolean
}) {
    return (
        <Link
            href={props.link}
        >
            <div className={`min-h-20 px-3 flex flex-row items-center gap-10 text-base hover:bg-gray-400 hover:text-white ${props.active ? "bg-[#3776AB] text-white": "text-[#2b2d42]"}`}>
                {<props.icon
                    fontSize="medium"
                />}
                {props.title}
            </div>
        </Link>
    );
}