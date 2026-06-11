"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {

    const [email, setEmail] = useState("");
    const router = useRouter();

    useEffect(() => {
        // Token check karo
        const token = localStorage.getItem("token");
        const savedEmail = localStorage.getItem("email");

        // Token nahi hai → login pe bhejo
        if(!token) {
            router.push("/login");
            return;
        }

        setEmail(savedEmail || "");
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        router.push("/login");
    };

    return (
        <div className="min-h-screen bg-gray-100">

            {/* Navbar */}
            <nav className="bg-blue-600 text-white p-4">
                <div className="max-w-6xl mx-auto
                    flex justify-between items-center">
                    <h1 className="text-xl font-bold">
                        🌟 NorthStar
                    </h1>
                    <button
                        onClick={handleLogout}
                        className="bg-white text-blue-600
                            px-4 py-2 rounded-lg text-sm
                            font-semibold hover:bg-gray-100">
                        Logout
                    </button>
                </div>
            </nav>

            {/* Content */}
            <div className="max-w-6xl mx-auto p-8">
                <h2 className="text-2xl font-bold mb-2">
                    Welcome back! 👋
                </h2>
                <p className="text-gray-600 mb-8">
                    {email}
                </p>

                {/* Feature Cards */}
                <div className="grid grid-cols-2 gap-6">
                    <div className="bg-white p-6
                        rounded-lg shadow-md">
                        <h3 className="font-bold text-lg mb-2">
                            👤 My Profile
                        </h3>
                        <p className="text-gray-500 text-sm">
                            Coming soon...
                        </p>
                    </div>
                    <div className="bg-white p-6
                        rounded-lg shadow-md">
                        <h3 className="font-bold text-lg mb-2">
                            🛠️ My Skills
                        </h3>
                        <p className="text-gray-500 text-sm">
                            Coming soon...
                        </p>
                    </div>
                    <div className="bg-white p-6
                        rounded-lg shadow-md">
                        <h3 className="font-bold text-lg mb-2">
                            📄 Resume
                        </h3>
                        <p className="text-gray-500 text-sm">
                            Coming soon...
                        </p>
                    </div>
                    <div className="bg-white p-6
                        rounded-lg shadow-md">
                        <h3 className="font-bold text-lg mb-2">
                            🤖 AI Roadmap
                        </h3>
                        <p className="text-gray-500 text-sm">
                            Coming soon...
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}