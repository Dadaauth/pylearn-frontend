

export default function Page() {
    return (
        <>
            <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
                <header className="w-full bg-blue-600 text-white py-4 shadow-md px-4">
                    <div className="container mx-auto flex justify-between items-center">
                        <h1 className="text-3xl font-bold">Pylearn</h1>
                        <nav>
                            <ul className="flex space-x-4">
                                <li><a href={`${[process.env.NEXT_PUBLIC_LANDING_PAGE_DOMAIN]}`} className="hover:underline">Home</a></li>
                                <li><a href={`${[process.env.NEXT_PUBLIC_LANDING_PAGE_DOMAIN]}/courses`} className="hover:underline">Courses</a></li>
                                <li><a href={`${process.env.NEXT_PUBLIC_INTRANET_DOMAIN}/auth/login`} className="hover:underline">Login</a></li>
                                <li><a href={`${[process.env.NEXT_PUBLIC_LANDING_PAGE_DOMAIN]}/about`} className="hover:underline">About</a></li>
                                <li><a href={`${[process.env.NEXT_PUBLIC_LANDING_PAGE_DOMAIN]}/contact`} className="hover:underline">Contact</a></li>
                            </ul>
                        </nav>
                    </div>
                </header>
                <main className="flex-grow container mx-auto py-16 px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-4">Learn Tech Skills</h2>
                        <p className="text-lg text-gray-700">Master Software Engineering, UI/UX Design, and Video Editing</p>
                        <a href={`${[process.env.NEXT_PUBLIC_LANDING_PAGE_DOMAIN]}/apply`}>
                            <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">Apply Now</button>
                        </a>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <img
                                src="https://media.istockphoto.com/id/1133924836/photo/programming-code-abstract-technology-background-of-software-developer-and-computer-script.jpg?s=1024x1024&w=is&k=20&c=cVsQE-lUVsCyXZSiofanXFf4UdRYtATs1K9jL5pknnw="
                                alt="Software Engineering"
                                className="w-full h-40 object-cover rounded-t-lg mb-4"
                            />
                            <h3 className="text-2xl font-bold mb-2">Software Engineering</h3>
                            <p className="text-gray-700">Learn the fundamentals of software engineering and build robust applications.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <img
                                src="https://img.freepik.com/free-vector/gradient-ui-ux-background_23-2149052117.jpg?t=st=1740143875~exp=1740147475~hmac=be5cc6a63305b3a803c71146dd337e6f7d1735bcdfa5b9080da96b3fee040850&w=1380"
                                alt="UI/UX Design" className="w-full h-40 object-cover rounded-t-lg mb-4"
                            />
                            <h3 className="text-2xl font-bold mb-2">UI/UX Design</h3>
                            <p className="text-gray-700">Design user-friendly interfaces and create engaging user experiences.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <img
                                src="https://media.istockphoto.com/id/1356585971/photo/unrecognizable-guy-editing-astronaut-video.jpg?s=612x612&w=0&k=20&c=xeszOlvz5DAH2EObVOR1xSBHE2WlzVrh5SLitut99AY="
                                alt="Video Editing" className="w-full h-40 object-cover rounded-t-lg mb-4"
                            />
                            <h3 className="text-2xl font-bold mb-2">Video Editing</h3>
                            <p className="text-gray-700">Edit videos like a pro and create stunning visual content.</p>
                        </div>
                    </div>
                </main>
                <footer className="w-full bg-blue-600 text-white py-4">
                    <div className="container mx-auto text-center">
                        <p>&copy; {new Date().getFullYear()} Pylearn. All rights reserved.</p>
                    </div>
                </footer>
            </div>
        </>
    );
}