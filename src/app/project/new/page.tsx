import AppNavBar from "@/components/ui/navbar";
import Form from "./form";

export default function Page() {
    return (
        <>
            <AppNavBar />
            <div className="mx-6">
                <h3>Create a new Project</h3>
                <Form />
            </div>
        </>
    );
}