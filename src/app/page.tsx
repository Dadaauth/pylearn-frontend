"use client"
import { useEffect, useState } from "react";
import { Star } from "@mui/icons-material";
import { Progress } from "@heroui/react";
import Cookies from "js-cookie";

import AppNavBar from "@/components/ui/navbar";
import ProtectedRoute from "@/components/utils/protected";
import ProtectedAdmin from "@/components/utils/ProtectedAdmin";
import ProtectedMentor from "@/components/utils/protectedMentor";
import { countCompletedProjectsAndModules } from "./utils";
import { CurrentProjectsCard, DashboardCard } from "@/components/ui/home";

export default function Home() {
  const userRole = Cookies.get("role")
  return (
    <>
      <AppNavBar />
      {userRole == "admin"? <AdminDashboard />: 
      userRole == "mentor"? <MentorDashboard />: <StudentDashBoard />}
    </>
  );
}


function AdminDashboard() {
  return (
    <ProtectedAdmin>
      <div className="mx-6">
        <div className="sm:flex sm:flex-row sm:gap-16 my-3">
          <DashboardCard
            title="Recent Activities"
            nodata_msg="No Activities!"
          />

          <DashboardCard
            title="Announcements"
            nodata_msg="No Announcements!"
            />
        </div>
      </div>
    </ProtectedAdmin>
  );
}

function MentorDashboard() {
  return (
    <ProtectedMentor>
      <div className="mx-6">
        <div className="sm:flex sm:flex-row sm:gap-16 my-3">
          <DashboardCard
            title="Recent Activities"
            nodata_msg="No Activities!"
          />

          <DashboardCard
            title="Announcements"
            nodata_msg="No Announcements!"
          />
        </div>
      </div>
    </ProtectedMentor>
  );
}

function StudentDashBoard() {
  const [progressState, setProgressState] = useState({
    "projects": 0,
    "modules": 0
  })
  useEffect(() => {
    async function fetchData() {
      const response = await countCompletedProjectsAndModules();
      if (response) {
        let projects = 0;
        let modules = 0;

        if (response.projects.all != 0)
          projects = (response.projects.completed / response.projects.all) * 100
        if (response.modules.all != 0)
          modules = (response.modules.completed / response.modules.all) * 100

        setProgressState({projects, modules})
      }
    }

    fetchData();
  }, [])
  return (
    <>
      <ProtectedRoute>
        <div className="mx-6">
          <div className="bg-[#3776AB] rounded-[10px] max-w-[30rem] min-h-10 p-2 border-[#2EC4B6] border-1 flex items-center mb-4">
            <p className="text-white w-full flex flex-row justify-between">
              0 days learning streak
              <Star
              />
            </p>
          </div>

          <div className="sm:flex sm:flex-row sm:gap-16 my-3">
            <CurrentProjectsCard />

            <div className="sm:flex sm:flex-col sm:gap-6 sm:w-[30rem]">
              <Progress
                aria-label="Loading..."
                label="Projects Completed"
                value={progressState.projects}
                classNames={{
                  indicator: "bg-[#3776AB]",
                }}
                showValueLabel
              />

              <Progress
                aria-label="Loading..."
                label="Modules Completed"
                value={progressState.modules}
                classNames={{
                  indicator: "bg-[#3776AB]",
                }}
                showValueLabel
              />
            </div>
          </div>

          <div className="sm:flex sm:flex-row sm:gap-16 my-3">
            <DashboardCard
              title="Recent Activities"
              nodata_msg="No Activities!"
            />

            <DashboardCard
              title="Announcements"
              nodata_msg="No Announcements!"
            />
          </div>
        </div>
      </ProtectedRoute>
    </>
  );
}