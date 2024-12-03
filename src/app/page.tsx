import AppNavBar from "@/components/ui/navbar";
import ProjectsAccordion from "./projectsAccordion";
import ProtectedRoute from "@/components/utils/protected";

export default function Home() {
  return (
    <>
      <AppNavBar />
      <ProtectedRoute>
        <div className="mx-6">
          <ProjectsAccordion />
        </div>
      </ProtectedRoute>
    </>
  );
}
