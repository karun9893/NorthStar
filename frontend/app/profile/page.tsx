"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProfilePage() {
    const [form, setForm] = useState({
        fullName: "", college: "", branch: "",
        graduationYear: "", phone: "",
        linkedinUrl: "", githubUrl: ""
    });
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) { router.push("/login"); return; }
    }, []);

    const handleSave = async () => {
        setLoading(true);
        const email = localStorage.getItem("email");

        try {
            const params = new URLSearchParams({
                email: email || "",
                ...form
            });

            const response = await fetch(
                `http://localhost:8081/api/student/profile?${params}`,
                { method: "POST" }
            );
            const result = await response.text();
            setMessage(result);
        } catch (error) {
            setMessage("Something went wrong!");
        }
        setLoading(false);
    };

    return (
        <div style={{backgroundColor: '#0f172a', minHeight: '100vh'}}>
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
                    👤 My Profile
                </h1>
                <p style={{color: '#94a3b8', marginBottom: '32px'}}>
                    Update your student information
                </p>

                <div style={{backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '32px'}}>
                    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px'}}>

                        {[
                            { label: "Full Name", key: "fullName", placeholder: "Karun Patidhar" },
                            { label: "College", key: "college", placeholder: "RGPV Bhopal" },
                            { label: "Branch", key: "branch", placeholder: "Computer Science" },
                            { label: "Graduation Year", key: "graduationYear", placeholder: "2025" },
                            { label: "Phone", key: "phone", placeholder: "9999999999" },
                            { label: "LinkedIn URL", key: "linkedinUrl", placeholder: "linkedin.com/in/karun" },
                        ].map((field) => (
                            <div key={field.key}>
                                <label style={{color: '#94a3b8', fontSize: '14px', display: 'block', marginBottom: '8px'}}>
                                    {field.label}
                                </label>
                                <input
                                    value={form[field.key as keyof typeof form]}
                                    onChange={(e) => setForm({...form, [field.key]: e.target.value})}
                                    placeholder={field.placeholder}
                                    style={{width: '100%', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px', padding: '10px 14px', color: 'white', fontSize: '14px', boxSizing: 'border-box'}}
                                />
                            </div>
                        ))}

                        <div style={{gridColumn: 'span 2'}}>
                            <label style={{color: '#94a3b8', fontSize: '14px', display: 'block', marginBottom: '8px'}}>
                                GitHub URL
                            </label>
                            <input
                                value={form.githubUrl}
                                onChange={(e) => setForm({...form, githubUrl: e.target.value})}
                                placeholder="github.com/karun9893"
                                style={{width: '100%', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px', padding: '10px 14px', color: 'white', fontSize: '14px', boxSizing: 'border-box'}}
                            />
                        </div>
                    </div>

                    {message && (
                        <div style={{marginTop: '20px', padding: '12px', borderRadius: '8px', backgroundColor: message === "Profile saved!" ? '#052e16' : '#450a0a', border: `1px solid ${message === "Profile saved!" ? '#16a34a' : '#dc2626'}`, color: message === "Profile saved!" ? '#4ade80' : '#f87171', textAlign: 'center'}}>
                            {message === "Profile saved!" ? "✅ " : "❌ "}{message}
                        </div>
                    )}

                    <button
                        onClick={handleSave}
                        disabled={loading}
                        style={{marginTop: '24px', width: '100%', padding: '12px', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', border: 'none', borderRadius: '8px', color: 'white', fontWeight: '600', fontSize: '16px', cursor: 'pointer'}}>
                        {loading ? "Saving..." : "Save Profile"}
                    </button>
                </div>
            </div>
        </div>
    );
}