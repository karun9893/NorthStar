"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SkillsPage() {
    const [skills, setSkills] = useState<any[]>([]);
    const [skillName, setSkillName] = useState("");
    const [level, setLevel] = useState("Beginner");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const email = typeof window !== "undefined"
        ? localStorage.getItem("email") || "" : "";

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) { router.push("/login"); return; }
        fetchSkills();
    }, []);

    const fetchSkills = async () => {
        try {
            const res = await fetch(
                `http://localhost:8081/api/skills?email=${email}`);
            const data = await res.json();
            setSkills(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleAdd = async () => {
        if (!skillName) return;
        setLoading(true);
        try {
            const res = await fetch(
                `http://localhost:8081/api/skills/add?email=${email}&skillName=${skillName}&level=${level}`,
                { method: "POST" }
            );
            const result = await res.text();
            setMessage(result);
            setSkillName("");
            fetchSkills();
        } catch (error) {
            setMessage("Something went wrong!");
        }
        setLoading(false);
    };

    const handleDelete = async (id: number) => {
        try {
            await fetch(
                `http://localhost:8081/api/skills/${id}`,
                { method: "DELETE" }
            );
            fetchSkills();
        } catch (error) {
            console.error(error);
        }
    };

    const levelColors: any = {
        "Beginner": "#3b82f6",
        "Intermediate": "#8b5cf6",
        "Advanced": "#22c55e"
    };

    return (
        <div style={{backgroundColor: '#0f172a', minHeight: '100vh'}}>
            {/* Navbar */}
            <nav style={{backgroundColor: '#1e293b', borderBottom: '1px solid #334155', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                    <div style={{width: '36px', height: '36px', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <span>🌟</span>
                    </div>
                    <span style={{color: 'white', fontWeight: 'bold', fontSize: '20px'}}>NorthStar</span>
                </div>
                <button onClick={() => router.push("/dashboard")}
                        style={{border: '1px solid #475569', color: '#cbd5e1', backgroundColor: 'transparent', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer'}}>
                    ← Dashboard
                </button>
            </nav>

            <div style={{maxWidth: '800px', margin: '0 auto', padding: '40px 24px'}}>
                <h1 style={{color: 'white', fontSize: '24px', fontWeight: 'bold', marginBottom: '8px'}}>
                    🛠️ My Skills
                </h1>
                <p style={{color: '#94a3b8', marginBottom: '32px'}}>
                    Add and manage your technical skills
                </p>

                {/* Add Skill Card */}
                <div style={{backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '24px', marginBottom: '24px'}}>
                    <h2 style={{color: 'white', fontSize: '18px', fontWeight: '600', marginBottom: '16px'}}>
                        Add New Skill
                    </h2>
                    <div style={{display: 'grid', gridTemplateColumns: '2fr 1fr auto', gap: '12px', alignItems: 'end'}}>
                        <div>
                            <label style={{color: '#94a3b8', fontSize: '14px', display: 'block', marginBottom: '8px'}}>
                                Skill Name
                            </label>
                            <input
                                value={skillName}
                                onChange={(e) => setSkillName(e.target.value)}
                                placeholder="e.g. Java, React, Python"
                                style={{width: '100%', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px', padding: '10px 14px', color: 'white', fontSize: '14px', boxSizing: 'border-box'}}
                            />
                        </div>
                        <div>
                            <label style={{color: '#94a3b8', fontSize: '14px', display: 'block', marginBottom: '8px'}}>
                                Level
                            </label>
                            <select
                                value={level}
                                onChange={(e) => setLevel(e.target.value)}
                                style={{width: '100%', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px', padding: '10px 14px', color: 'white', fontSize: '14px'}}>
                                <option>Beginner</option>
                                <option>Intermediate</option>
                                <option>Advanced</option>
                            </select>
                        </div>
                        <button
                            onClick={handleAdd}
                            disabled={loading}
                            style={{padding: '10px 20px', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', border: 'none', borderRadius: '8px', color: 'white', fontWeight: '600', cursor: 'pointer', whiteSpace: 'nowrap'}}>
                            {loading ? "Adding..." : "+ Add"}
                        </button>
                    </div>

                    {message && (
                        <div style={{marginTop: '12px', padding: '10px', borderRadius: '8px', backgroundColor: '#052e16', border: '1px solid #16a34a', color: '#4ade80', fontSize: '14px'}}>
                            ✅ {message}
                        </div>
                    )}
                </div>

                {/* Skills List */}
                <div style={{backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '24px'}}>
                    <h2 style={{color: 'white', fontSize: '18px', fontWeight: '600', marginBottom: '16px'}}>
                        My Skills ({skills.length})
                    </h2>

                    {skills.length === 0 ? (
                        <p style={{color: '#475569', textAlign: 'center', padding: '40px'}}>
                            No skills added yet. Add your first skill! 🚀
                        </p>
                    ) : (
                        <div style={{display: 'flex', flexWrap: 'wrap', gap: '12px'}}>
                            {skills.map((skill: any) => (
                                <div key={skill.id}
                                     style={{display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '10px', padding: '10px 16px'}}>
                                    <span style={{color: 'white', fontWeight: '500'}}>
                                        {skill.skillName}
                                    </span>
                                    <span style={{backgroundColor: levelColors[skill.level] || '#3b82f6', color: 'white', fontSize: '12px', padding: '2px 10px', borderRadius: '20px'}}>
                                        {skill.level}
                                    </span>
                                    <button
                                        onClick={() => handleDelete(skill.id)}
                                        style={{background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '16px', padding: '0'}}>
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}