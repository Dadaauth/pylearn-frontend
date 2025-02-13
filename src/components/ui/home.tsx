import { useState, useEffect } from "react";

import Link from "next/link";
import { RocketLaunch } from "@mui/icons-material";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { fetchCurrentProjectsForStudent } from "@/app/utils";

type CurrentProjects = Array<{
    id: string,
    title: string,
}>

export function CurrentProjectsCard() {
    const [currentProjects, setCurrentProjects] = useState<CurrentProjects>()
  
    useEffect(() => {
      async function fetchData() {
        const pjts = await fetchCurrentProjectsForStudent();
        let projects = [];
        for (let i = 0; i < pjts.length; i++) {
          let project = pjts[i];
          projects.push({id: project.id, title: project.title})
        }
        setCurrentProjects(projects);
      }
  
      fetchData();
    }, [])
  

    return (
        <div className="mb-5 sm:w-[30rem]">
        <div className="bg-[#3776AB] rounded-t-[10px] px-4 py-1">
            <h3 className="text-white">Current Projects</h3>
        </div>
        {currentProjects && currentProjects.length > 0?
            <div className="border-2 rounded-b-[10px] min-h-[40px] px-3 max-h-[180px] overflow-scroll overflow-x-hidden">
            <div className="my-2 flex flex-col gap-2">
                {currentProjects.map((data) => {
                return (
                    <Link key={data.id} href={`/project/${data.id}`}>
                    <div className="flex flex-row justify-between border-2 cursor-pointer p-2 rounded-lg hover:bg-[#3776AB] hover:text-white">
                        <p>{data.title}</p>
                        <KeyboardArrowRightIcon />
                    </div>
                    </Link>
                );
                })
                }
            </div>
            </div>
        :
            <div className="border-2 rounded-b-[10px] min-h-[40px] flex items-center justify-center">
            <p className="text-center text-[#2B2D42]">No Projects Available! <RocketLaunch /></p>
            </div>
        }
        </div>
    );
}


export function DashboardCard(props: {
    title: string,
    data?: Array<{title: string, id: string}>,
    nodata_msg?: string
}) {
    return (
        <div className="mb-5 sm:w-[30rem]">
        <div className="bg-[#3776AB] rounded-t-[10px] px-4 py-1">
            <h3 className="text-white">{props.title}</h3>
        </div>
        {props.data?
            <div className="border-2 rounded-b-[10px] min-h-[40px] px-3 max-h-[180px] overflow-scroll overflow-x-hidden">
            <div className="my-2 flex flex-col gap-2">
                {props.data.map((data) => {
                return <CardItem
                    title={data.title}
                    id={data.id}
                />
                })
                }
            </div>
            </div>
        :
            <div className="border-2 rounded-b-[10px] min-h-[40px] flex items-center justify-center">
            <p className="text-center text-[#2B2D42]">{props.nodata_msg} <RocketLaunch /></p>
            </div>
        }
        </div>
    );
}
  
function CardItem({title, id}:
{
    title: string,
    id: string,
}
) {
    return (
      <Link href={`/projects/${id}`}>
        <div className="flex flex-row justify-between border-2 cursor-pointer p-2 rounded-lg hover:bg-[#3776AB] hover:text-white">
          <p>{title}</p>
          <KeyboardArrowRightIcon />
        </div>
      </Link>
    );
}
  