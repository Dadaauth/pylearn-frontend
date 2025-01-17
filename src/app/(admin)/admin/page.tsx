
import AppNavBar from "@/components/ui/navbar";
import ProtectedAdmin from "@/components/utils/ProtectedAdmin";

export default function Page() {
    return (
        <>
            <AppNavBar />
            <ProtectedAdmin>
                <div className="mx-6">

                </div>
            </ProtectedAdmin>
        </>
    );
}