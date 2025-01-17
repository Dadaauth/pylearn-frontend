import Cookies from "js-cookie";

export default function WelcomeSection() {
    return (
        <div className="mx-6">
            <h2 className="font-bold text-[#3776AB] text-2xl">Software Engineering</h2>
            <p className="font-medium text-[#2B2D42] mb-6">Welcome back, {Cookies.get("first_name")}!</p>
        </div>
    );
}