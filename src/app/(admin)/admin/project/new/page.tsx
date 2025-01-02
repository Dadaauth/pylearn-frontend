import AppNavBar from "@/components/ui/navbar";
import Form from "./form";
import ProtectedAdmin from "@/components/utils/ProtectedAdmin";
import WelcomeSection from "@/components/ui/welcomeSection";

export default function Page() {
    return (
        <>
            <AppNavBar />
            <ProtectedAdmin>
                <WelcomeSection />
                <div className="mx-6">
                    <h3 className="font-bold text-[#3776AB] text-lg">Create a new Project</h3>
                    <Form />
                </div>
            </ProtectedAdmin>
        </>
    );
}