"use client";

import { useState } from "react";
import { loginUser } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleLogin = async () => {
        setLoading(true);

        try {
            const result = await loginUser(
                email, password);

            if(result.token) {
                // Token localStorage mein save karo
                localStorage.setItem(
                    "token", result.token);
                localStorage.setItem(
                    "email", result.email);

                // Dashboard pe bhejo
                router.push("/dashboard");
            } else {
                setMessage(result.error ||
                    "Login failed!");
            }
        } catch (error) {
            setMessage("Something went wrong!");
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gray-100
            flex items-center justify-center">

            <div className="bg-white p-8 rounded-lg
                shadow-md w-96">

                <h1 className="text-2xl font-bold
                    text-center text-blue-600 mb-6">
                    🌟 NorthStar
                </h1>
                <h2 className="text-xl font-semibold
                    text-center mb-6">
                    Welcome Back!
                </h2>

                <div className="mb-4">
                    <label className="block text-sm
                        font-medium mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)}
                        placeholder="karun@gmail.com"
                        className="w-full border rounded-lg
                            p-3 focus:outline-none
                            focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm
                        font-medium mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full border rounded-lg
                            p-3 focus:outline-none
                            focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    onClick={handleLogin}
                    disabled={loading}
                    className="w-full bg-blue-600 text-white
                        py-3 rounded-lg font-semibold
                        hover:bg-blue-700 disabled:opacity-50">
                    {loading ? "Logging in..." : "Login"}
                </button>

                {message && (
                    <p className="mt-4 text-center
                        text-sm text-red-600">
                        {message}
                    </p>
                )}

                <p className="mt-4 text-center text-sm">
                    No account?{" "}
                    <a href="/register"
                       className="text-blue-600
                            hover:underline">
                        Register
                    </a>
                </p>
            </div>
        </div>
    );
}