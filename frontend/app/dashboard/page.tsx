"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const [email, setEmail] = useState("");
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const savedEmail = localStorage.getItem("email");
        if (!token) { router.push("/login"); return; }
        setEmail(savedEmail || "");
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        router.push("/login");
    };

    const features = [
        { icon: "👤", title: "My Profile", desc: "Manage your student profile", color: "#3b82f6", link: "/profile" },
        { icon: "🛠️", title: "My Skills", desc: "Track and manage your skills", color: "#8b5cf6", link: "/skills" },
        { icon: "📄", title: "Resume", desc: "Upload and analyze resume", color: "#f97316", link: "/resume" },
        { icon: "🤖", title: "AI Roadmap", desc: "Get personalized learning path", color: "#22c55e", link: "/roadmap" },
        { icon: "🏢", title: "Companies", desc: "Get company recommendations", color: "#eab308", link: "/companies" },
        { icon: "🎯", title: "Interview Prep", desc: "Prepare for interviews with AI", color: "#ec4899", link: "/interview" },
    ];

    return (
        <div style={{backgroundColor: '#0f172a', minHeight: '100vh'}}>
            <nav style={{backgroundColor: '#1e293b', borderBottom: '1px solid #334155', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                    <div style={{width: '36px', height: '36px', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <span>🌟</span>
                    </div>
                    <span style={{color: 'white', fontWeight: 'bold', fontSize: '20px'}}>NorthStar</span>
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
                    <span style={{color: '#94a3b8', fontSize: '14px'}}>{email}</span>
                    <button onClick={handleLogout}
                            style={{border: '1px solid #475569', color: '#cbd5e1', backgroundColor: 'transparent', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px'}}>
                        Logout
                    </button>
                </div>
            </nav>

            <div style={{maxWidth: '1200px', margin: '0 auto', padding: '40px 24px'}}>
                <h1 style={{color: 'white', fontSize: '28px', fontWeight: 'bold', marginBottom: '8px'}}>
                    Welcome back! 👋
                </h1>
                <p style={{color: '#94a3b8', marginBottom: '40px'}}>{email}</p>

                <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '40px'}}>
                    {[
                        { label: "Profile Complete", value: "20%" },
                        { label: "Skills Added", value: "0" },
                        { label: "Days to Placement", value: "90" },
                    ].map((stat) => (
                        <div key={stat.label} style={{backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '20px', textAlign: 'center'}}>
                            <p style={{color: 'white', fontSize: '24px', fontWeight: 'bold'}}>{stat.value}</p>
                            <p style={{color: '#94a3b8', fontSize: '14px', marginTop: '4px'}}>{stat.label}</p>
                        </div>
                    ))}
                </div>

                <h2 style={{color: '#cbd5e1', fontSize: '18px', fontWeight: '600', marginBottom: '16px'}}>
                    Features
                </h2>
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px'}}>
                    {features.map((feature) => (
                        <div key={feature.title}
                             onClick={() => router.push(feature.link)}
                             style={{backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '24px', cursor: 'pointer', transition: 'all 0.2s'}}
                             onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#263548')}
                             onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#1e293b')}>
                            <div style={{width: '40px', height: '40px', backgroundColor: feature.color, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px'}}>
                                <span>{feature.icon}</span>
                            </div>
                            <h3 style={{color: 'white', fontWeight: '600', marginBottom: '8px'}}>{feature.title}</h3>
                            <p style={{color: '#94a3b8', fontSize: '14px'}}>{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}