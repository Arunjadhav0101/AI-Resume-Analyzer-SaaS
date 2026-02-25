"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const formBody = new URLSearchParams();
            formBody.append("username", email);
            formBody.append("password", password);

            const res = await fetch("http://localhost:8000/api/v1/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: formBody,
            });

            if (!res.ok) {
                throw new Error("Invalid credentials");
            }
            const data = await res.json();
            localStorage.setItem("token", data.access_token);
            router.push("/dashboard");
        } catch (err: any) {
            setError(err.message || "An error occurred");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-4">
            <div className="w-full max-w-md p-8 bg-gray-800/80 rounded-2xl border border-gray-700 shadow-xl backdrop-blur-md">
                <h2 className="text-3xl font-bold mb-6 text-center text-blue-400">Welcome Back</h2>
                {error && <div className="mb-4 bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded-lg">{error}</div>}
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:border-blue-500 transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:border-blue-500 transition-colors"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-500 font-semibold text-lg transition-all"
                    >
                        Login
                    </button>
                </form>
                <p className="mt-6 text-center text-gray-400">
                    Don't have an account? <Link href="/register" className="text-blue-400 hover:text-blue-300">Register</Link>
                </p>
            </div>
        </div>
    );
}
