"use client"
import { useEffect, useState } from "react";
import { Star } from "@mui/icons-material";
import { Progress } from "@nextui-org/react";
import Cookies from "js-cookie";

import AppNavBar from "@/components/ui/navbar";
import ProtectedRoute from "@/components/utils/protected";
import ProtectedAdmin from "@/components/utils/ProtectedAdmin";
import WelcomeSection from "@/components/ui/welcomeSection";
import { countCompletedProjectsAndModules } from "./utils";
import { CurrentProjectsCard, DashboardCard } from "@/components/ui/home";

export default function Home() {
  const userRole = Cookies.get("role")
  return (
    <>
      <AppNavBar />
      {userRole == "admin"? <AdminDashboard />: <StudentDashBoard />}
    </>
  );
}


function AdminDashboard() {
  return (
    <ProtectedAdmin>
      <WelcomeSection />
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


function StudentDashBoard() {
  const [progressState, setProgressState] = useState({
    "projects": {
      all: 0,
      completed: 0,
    },
    "modules": {
      all: 0,
      completed: 0,
    }
  })
  useEffect(() => {
    async function fetchData() {
      let response = await countCompletedProjectsAndModules();
      if (response) setProgressState({...response})
    }

    fetchData();
  }, [])
  return (
    <>
      <ProtectedRoute>
        <WelcomeSection />
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
                value={(progressState.projects.completed / progressState.projects.all) * 100}
                classNames={{
                  indicator: "bg-[#3776AB]",
                }}
                showValueLabel
              />

              <Progress
                aria-label="Loading..."
                label="Modules Completed"
                value={(progressState.modules.completed / progressState.modules.all) * 100}
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