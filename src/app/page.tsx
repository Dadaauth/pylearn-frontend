import { Star } from "@mui/icons-material";
import AppNavBar from "@/components/ui/navbar";
import AppFooter from "@/components/ui/footer";
import ProjectsAccordion from "./projectsAccordion";
import ProtectedRoute from "@/components/utils/protected";
import { RocketLaunch } from "@mui/icons-material";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Link from "next/link";
import { Progress } from "@nextui-org/react";
import WelcomeSection from "@/components/ui/welcomeSection";

export default function Home() {
  return (
    <>
      <AppNavBar />
      <ProtectedRoute>
        <WelcomeSection />
        <div className="mx-6">
          <div className="bg-[#3776AB] rounded-[10px] max-w-[30rem] min-h-10 p-2 border-[#FFC107] border-1 flex items-center mb-4">
            <p className="text-white w-full flex flex-row justify-between">
              15 days learning streak
              <Star />
            </p>
          </div>

          <div className="sm:flex sm:flex-row sm:gap-16 my-3">
            <DashboardCard
              title="Ongoing Projects"
              nodata_msg="No Projects Available!"
              show
            />

            <div className="sm:flex sm:flex-col sm:gap-6 sm:w-[30rem]">
              <Progress
                aria-label="Loading..."
                label="Projects Completed"
                value={60}
                classNames={{
                  indicator: "bg-[#3776AB]",
                }}
                showValueLabel
              />

              <Progress
                aria-label="Loading..."
                label="Modules Completed"
                value={30}
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
              show
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

function DashboardCard(props: {
  title: string,
  show?: boolean,
  nodata_msg?: string
}) {
  return (
    <div className="mb-5 sm:w-[30rem]">
      <div className="bg-[#3776AB] rounded-t-[10px] px-4 py-1">
        <h3 className="text-white">{props.title}</h3>
      </div>
      {props.show?
        <div className="border-2 rounded-b-[10px] min-h-[40px] px-3 max-h-[180px] overflow-scroll overflow-x-hidden">
          <div className="my-2 flex flex-col gap-2">
            <CardItem
              title="Introduction to Python"
              id="1"
            />
            <CardItem
              title="Introduction to Python"
              id="1"
            />
            <CardItem
              title="Introduction to Python"
              id="1"
            />
            <CardItem
              title="Introduction to Python"
              id="1"
            />
            <CardItem
              title="Introduction to Python"
              id="1"
            />
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
