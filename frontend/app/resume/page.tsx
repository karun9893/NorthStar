"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ResumePage() {
    const [resume, setResume] = useState<any>(null);
    const [file, setFile] = useState<File | null>(null);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const email = typeof window !== "undefined"
        ? localStorage.getItem("email") || "" : "";

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) { router.push("/login"); return; }
        fetchResume();
    }, []);

    const fetchResume = async () => {
        try {
            const res = await fetch(
                `http://localhost:8081/api/resume?email=${email}`);
            if(res.ok) {
                const data = await res.json();
                setResume(data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpload = async () => {
        if (!file) return;
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("email", email);
            formData.append("file", file);

            const res = await fetch(
                "http://localhost:8081/api/resume/upload",
                { method: "POST", body: formData }
            );
            const result = await res.text();
            setMessage(result);
            fetchResume();
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
                    📄 Resume
                </h1>
                <p style={{color: '#94a3b8', marginBottom: '32px'}}>
                    Upload your resume for AI analysis
                </p>

                {/* Upload Card */}
                <div style={{backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '32px', marginBottom: '24px'}}>
                    <h2 style={{color: 'white', fontSize: '18px', fontWeight: '600', marginBottom: '20px'}}>
                        Upload Resume
                    </h2>

                    {/* File Drop Area */}
                    <div style={{border: '2px dashed #334155', borderRadius: '12px', padding: '40px', textAlign: 'center', marginBottom: '20px', cursor: 'pointer'}}
                         onClick={() => document.getElementById('fileInput')?.click()}>
                        <p style={{color: '#94a3b8', fontSize: '40px', marginBottom: '12px'}}>📁</p>
                        <p style={{color: 'white', fontWeight: '500', marginBottom: '8px'}}>
                            {file ? file.name : "Click to select PDF"}
                        </p>
                        <p style={{color: '#475569', fontSize: '14px'}}>
                            PDF files only, max 10MB
                        </p>
                        <input
                            id="fileInput"
                            type="file"
                            accept=".pdf"
                            style={{display: 'none'}}
                            onChange={(e) => setFile(e.target.files?.[0] || null)}
                        />
                    </div>

                    {message && (
                        <div style={{marginBottom: '16px', padding: '12px', borderRadius: '8px', backgroundColor: '#052e16', border: '1px solid #16a34a', color: '#4ade80', fontSize: '14px'}}>
                            ✅ {message}
                        </div>
                    )}

                    <button
                        onClick={handleUpload}
                        disabled={loading || !file}
                        style={{width: '100%', padding: '12px', background: file ? 'linear-gradient(135deg, #3b82f6, #8b5cf6)' : '#1e293b', border: file ? 'none' : '1px solid #334155', borderRadius: '8px', color: file ? 'white' : '#475569', fontWeight: '600', fontSize: '16px', cursor: file ? 'pointer' : 'not-allowed'}}>
                        {loading ? "Uploading..." : "Upload Resume"}
                    </button>
                </div>

                {/* Current Resume Card */}
                {resume && (
                    <div style={{backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '24px'}}>
                        <h2 style={{color: 'white', fontSize: '18px', fontWeight: '600', marginBottom: '16px'}}>
                            Current Resume
                        </h2>
                        <div style={{display: 'flex', alignItems: 'center', gap: '16px', backgroundColor: '#0f172a', borderRadius: '12px', padding: '16px'}}>
                            <span style={{fontSize: '32px'}}>📄</span>
                            <div>
                                <p style={{color: 'white', fontWeight: '500', marginBottom: '4px'}}>
                                    {resume.fileName}
                                </p>
                                <p style={{color: '#94a3b8', fontSize: '14px'}}>
                                    Uploaded: {new Date(resume.uploadedAt).toLocaleDateString()}
                                </p>
                            </div>
                            <div style={{marginLeft: 'auto'}}>
                                <span style={{backgroundColor: '#052e16', border: '1px solid #16a34a', color: '#4ade80', padding: '4px 12px', borderRadius: '20px', fontSize: '12px'}}>
                                    ✅ Uploaded
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}