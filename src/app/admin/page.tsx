
import AppNavBar from "@/components/ui/navbar";
import ProtectedAdmin from "@/components/utils/ProtectedAdmin";
import ProjectsAccordion from "./projectsAccordion";

export default function Page() {
    return (
        <>
            <AppNavBar />
            <ProtectedAdmin>
                <div className="mx-6">
                    <ProjectsAccordion />
                </div>
            </ProtectedAdmin>
        </>
    );
}