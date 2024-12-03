import AppNavBar from "@/components/ui/navbar";
import Form from "./form";
import ProtectedAdmin from "@/components/utils/ProtectedAdmin";

export default function Page() {
    return (
        <>
            <AppNavBar />
            <ProtectedAdmin>
                <div className="mx-6">
                    <h3>Create a new Project</h3>
                    <Form endpoint={`${process.env.NEXT_PUBLIC_API_URL_V1}/project/create`}/>
                </div>
            </ProtectedAdmin>
        </>
    );
}