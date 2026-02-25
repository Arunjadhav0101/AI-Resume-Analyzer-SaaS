"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:8000/api/v1/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, full_name: fullName }),
            });

            if (!res.ok) {
                throw new Error("Registration failed. Email may exist.");
            }
            router.push("/login");
        } catch (err: any) {
            setError(err.message || "An error occurred");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-4">
            <div className="w-full max-w-md p-8 bg-gray-800/80 rounded-2xl border border-gray-700 shadow-xl backdrop-blur-md">
                <h2 className="text-3xl font-bold mb-6 text-center text-teal-400">Create Account</h2>
                {error && <div className="mb-4 bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded-lg">{error}</div>}
                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:border-teal-500 transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:border-teal-500 transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:border-teal-500 transition-colors"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 rounded-lg bg-teal-600 hover:bg-teal-500 font-semibold text-lg transition-all"
                    >
                        Register
                    </button>
                </form>
                <p className="mt-6 text-center text-gray-400">
                    Already have an account? <Link href="/login" className="text-teal-400 hover:text-teal-300">Login</Link>
                </p>
            </div>
        </div>
    );
}
