"use client";  // Client side component hai ye

import { useState } from "react";
import { registerUser } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function RegisterPage() {

    // State = Component ka data store
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    // Form submit handler
    const handleRegister = async () => {
        setLoading(true);

        try {
            const result = await registerUser(
                email, password);
            setMessage(result);

            // Success pe login page pe bhejo
            if(result === "Registration successful!") {
                setTimeout(() => {
                    router.push("/login");
                }, 1500);
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

                {/* Title */}
                <h1 className="text-2xl font-bold
                    text-center text-blue-600 mb-6">
                    🌟 NorthStar
                </h1>
                <h2 className="text-xl font-semibold
                    text-center mb-6">
                    Create Account
                </h2>

                {/* Email Input */}
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

                {/* Password Input */}
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

                {/* Register Button */}
                <button
                    onClick={handleRegister}
                    disabled={loading}
                    className="w-full bg-blue-600 text-white
                        py-3 rounded-lg font-semibold
                        hover:bg-blue-700 disabled:opacity-50">
                    {loading ? "Creating..." : "Register"}
                </button>

                {/* Message */}
                {message && (
                    <p className="mt-4 text-center
                        text-sm text-green-600">
                        {message}
                    </p>
                )}

                {/* Login Link */}
                <p className="mt-4 text-center text-sm">
                    Already have account?{" "}
                    <a href="/login"
                       className="text-blue-600
                            hover:underline">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
}