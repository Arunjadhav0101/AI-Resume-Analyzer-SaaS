"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const [resumes, setResumes] = useState<any[]>([]);
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        fetchResumes();
    }, []);

    const fetchResumes = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login");
            return;
        }

        try {
            const res = await fetch("http://localhost:8000/api/v1/resumes/", {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.status === 401) {
                localStorage.removeItem("token");
                router.push("/login");
                return;
            }
            const data = await res.json();
            setResumes(data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return;

        const token = localStorage.getItem("token");
        const formData = new FormData();
        formData.append("file", file);

        setUploading(true);
        try {
            const res = await fetch("http://localhost:8000/api/v1/resumes/upload", {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
            });
            if (res.ok) {
                setFile(null);
                fetchResumes(); // reload
            }
        } catch (err) {
            console.error(err);
        } finally {
            setUploading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        router.push("/");
    };

    return (
        <div className="min-h-screen bg-gray-950 text-white p-8">
            <div className="max-w-6xl mx-auto border border-gray-800 rounded-2xl bg-gray-900/50 p-8 shadow-2xl">
                <div className="flex justify-between items-center mb-10 pb-4 border-b border-gray-800">
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">Your Dashboard</h1>
                    <button onClick={logout} className="px-4 py-2 border border-gray-700 hover:bg-red-500/20 hover:text-red-400 hover:border-red-500 transition-colors rounded-lg">Logout</button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1 border border-gray-800 rounded-xl p-6 bg-gray-800/20">
                        <h2 className="text-xl font-semibold mb-4 text-blue-300">Upload New Resume</h2>
                        <form onSubmit={handleUpload} className="flex flex-col gap-4">
                            <label className="border-2 border-dashed border-gray-600 rounded-xl p-8 hover:border-blue-500 transition-colors cursor-pointer text-center group">
                                <input
                                    type="file"
                                    accept="application/pdf"
                                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                                    className="hidden"
                                />
                                <svg className="w-10 h-10 mx-auto mb-3 text-gray-500 group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                <div className="text-gray-400 text-sm">{file ? file.name : "Click to select PDF"}</div>
                            </label>
                            <button
                                type="submit"
                                disabled={!file || uploading}
                                className="py-3 px-4 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700 disabled:text-gray-400 font-semibold transition-colors mt-2"
                            >
                                {uploading ? "Analyzing..." : "Upload & Analyze"}
                            </button>
                        </form>
                    </div>

                    <div className="lg:col-span-2 space-y-6">
                        <h2 className="text-xl font-semibold mb-4 text-teal-300">Previous Reports</h2>
                        {resumes.length === 0 ? (
                            <div className="text-gray-500 italic p-6 border border-gray-800 rounded-xl bg-gray-900">
                                You haven't uploaded any resumes yet. Your analysis will appear here.
                            </div>
                        ) : (
                            resumes.map((resume: any) => (
                                <div key={resume.id} className="border border-gray-700 hover:border-gray-500 rounded-xl p-6 bg-gray-800 transition-colors duration-300">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-lg font-bold text-gray-100">{resume.title}</h3>
                                        <span className="text-xs text-gray-400">{new Date(resume.upload_date).toLocaleDateString()}</span>
                                    </div>

                                    {resume.analysis ? (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-4">
                                                <div className="p-4 bg-gray-900 rounded-lg flex items-center justify-between border border-gray-700/50">
                                                    <span className="text-gray-400 text-sm font-medium">ATS Score</span>
                                                    <span className={`text-2xl font-bold ${resume.analysis.ats_score > 75 ? 'text-green-400' : 'text-yellow-400'}`}>
                                                        {resume.analysis.ats_score} / 100
                                                    </span>
                                                </div>
                                                <div className="p-4 bg-gray-900 rounded-lg border border-gray-700/50">
                                                    <span className="block text-gray-400 text-sm font-medium mb-1">Recommended Roles</span>
                                                    <span className="text-blue-300">{resume.analysis.recommended_roles}</span>
                                                </div>
                                                <div className="p-4 bg-gray-900 rounded-lg border border-gray-700/50">
                                                    <span className="block text-gray-400 text-sm font-medium mb-1">Missing Keywords</span>
                                                    <span className="text-gray-200 text-sm">{resume.analysis.missing_keywords}</span>
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <div className="p-4 bg-gray-900 rounded-lg border border-red-900/30">
                                                    <span className="block text-gray-400 text-sm font-medium mb-1 text-red-300">Skill Gap</span>
                                                    <span className="text-gray-200 text-sm">{resume.analysis.skill_gap}</span>
                                                </div>
                                                <div className="p-4 bg-gray-900 rounded-lg border border-teal-900/30">
                                                    <span className="block text-gray-400 text-sm font-medium mb-1 text-teal-300">Suggestions</span>
                                                    <span className="text-gray-200 text-sm whitespace-pre-line">{resume.analysis.suggestions}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-yellow-500 animate-pulse">Analysis pending...</div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
