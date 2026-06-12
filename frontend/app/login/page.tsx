"use client";

import { useState } from "react";
import { loginUser } from "@/lib/api";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async () => {
        setLoading(true);
        try {
            const result = await loginUser(email, password);
            if (result.token) {
                localStorage.setItem("token", result.token);
                localStorage.setItem("email", result.email);
                router.push("/dashboard");
            } else {
                setMessage(result.error || "Login failed!");
            }
        } catch (error) {
            setMessage("Something went wrong!");
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br
            from-slate-900 via-blue-950 to-slate-900
            flex items-center justify-center p-4">

            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4
                    w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"/>
                <div className="absolute bottom-1/4 right-1/4
                    w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"/>
            </div>

            <Card className="w-full max-w-md bg-slate-900/80
                border-slate-700 backdrop-blur-xl shadow-2xl
                relative z-10">

                <CardHeader className="text-center space-y-3 pb-6">
                    {/* Logo */}
                    <div className="mx-auto w-16 h-16
                        bg-gradient-to-br from-blue-500 to-purple-600
                        rounded-2xl flex items-center justify-center
                        shadow-lg shadow-blue-500/25">
                        <span className="text-2xl">🌟</span>
                    </div>

                    <CardTitle className="text-2xl font-bold
                        text-white">
                        Welcome Back
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                        Sign in to your NorthStar account
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-5">

                    {/* Email */}
                    <div className="space-y-2">
                        <Label className="text-slate-300 text-sm">
                            Email Address
                        </Label>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="karun@gmail.com"
                            className="bg-slate-800/50 border-slate-600
                                text-white placeholder:text-slate-500
                                focus:border-blue-500 focus:ring-blue-500/20
                                h-11"
                        />
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                        <Label className="text-slate-300 text-sm">
                            Password
                        </Label>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="bg-slate-800/50 border-slate-600
                                text-white placeholder:text-slate-500
                                focus:border-blue-500 focus:ring-blue-500/20
                                h-11"
                        />
                    </div>

                    {/* Error Message */}
                    {message && (
                        <div className="bg-red-500/10 border border-red-500/20
                            rounded-lg p-3 text-red-400 text-sm text-center">
                            {message}
                        </div>
                    )}

                    {/* Login Button */}
                    <Button
                        onClick={handleLogin}
                        disabled={loading}
                        className="w-full h-11 bg-gradient-to-r
                            from-blue-600 to-purple-600
                            hover:from-blue-500 hover:to-purple-500
                            text-white font-semibold shadow-lg
                            shadow-blue-500/25 transition-all duration-200">
                        {loading ? "Signing in..." : "Sign In"}
                    </Button>

                    {/* Divider */}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-700"/>
                        </div>
                        <div className="relative flex justify-center text-xs">
                            <span className="bg-slate-900 px-2 text-slate-500">
                                New to NorthStar?
                            </span>
                        </div>
                    </div>

                    {/* Register Link */}
                    <Button
                        variant="outline"
                        onClick={() => router.push("/register")}
                        className="w-full h-11 border-slate-600
                            text-slate-300 hover:bg-slate-800
                            hover:text-white transition-all duration-200">
                        Create Account
                    </Button>

                </CardContent>
            </Card>
        </div>
    );
}