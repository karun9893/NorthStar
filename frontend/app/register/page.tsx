"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Dashboard() {
    const [email, setEmail] = useState("");
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const savedEmail = localStorage.getItem("email");
        if (!token) {
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

    const features = [
        { icon: "👤", title: "My Profile", desc: "Manage your student profile", color: "from-blue-500 to-cyan-500" },
        { icon: "🛠️", title: "My Skills", desc: "Track and manage your skills", color: "from-purple-500 to-pink-500" },
        { icon: "📄", title: "Resume", desc: "Upload and analyze resume", color: "from-orange-500 to-red-500" },
        { icon: "🤖", title: "AI Roadmap", desc: "Get personalized learning path", color: "from-green-500 to-emerald-500" },
        { icon: "🏢", title: "Companies", desc: "Get company recommendations", color: "from-yellow-500 to-orange-500" },
        { icon: "🎯", title: "Interview Prep", desc: "Prepare for interviews with AI", color: "from-pink-500 to-rose-500" },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">

            {/* Background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"/>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"/>
            </div>

            {/* Navbar */}
            <nav className="relative z-10 border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-xl">
                <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                            <span className="text-lg">🌟</span>
                        </div>
                        <span className="text-xl font-bold text-white">NorthStar</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-slate-400 text-sm hidden md:block">
                            {email}
                        </span>
                        <Button
                            onClick={handleLogout}
                            variant="outline"
                            className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white text-sm">
                            Logout
                        </Button>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="relative z-10 max-w-6xl mx-auto px-6 py-10">

                {/* Welcome Section */}
                <div className="mb-10">
                    <h1 className="text-3xl font-bold text-white mb-2">
                        Welcome back! 👋
                    </h1>
                    <p className="text-slate-400">
                        Your AI-powered placement journey starts here.
                    </p>
                </div>

                {/* Stats Bar */}
                <div className="grid grid-cols-3 gap-4 mb-10">
                    {[
                        { label: "Profile Complete", value: "20%" },
                        { label: "Skills Added", value: "0" },
                        { label: "Days to Placement", value: "90" },
                    ].map((stat) => (
                        <div key={stat.label}
                             className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 text-center backdrop-blur-sm">
                            <p className="text-2xl font-bold text-white">{stat.value}</p>
                            <p className="text-slate-400 text-sm mt-1">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* Feature Cards */}
                <h2 className="text-lg font-semibold text-slate-300 mb-4">
                    Features
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {features.map((feature) => (
                        <Card key={feature.title}
                              className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/80 transition-all duration-200 cursor-pointer group">
                            <CardHeader className="pb-3">
                                <div className={`w-10 h-10 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200`}>
                                    <span className="text-lg">{feature.icon}</span>
                                </div>
                                <CardTitle className="text-white text-base">
                                    {feature.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-slate-400 text-sm">{feature.desc}</p>
                                <p className="text-slate-600 text-xs mt-2">Coming soon...</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}