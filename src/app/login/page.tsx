"use client";

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { UserService } from '@/service/user';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await UserService.login({ username, password });

            if (response.user) {
                router.push("/trafficviolation"); // Redirect if login is successful
            } 
            else {
                setError(response.error || "Invalid username or password.");
            }

        } catch (error) {
            setError("Login failed. Please try again.");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#CFE4F0]">
            <div className="w-full max-w-md bg-[#F2F2EE] p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Username"
                        className="w-full p-2 border rounded"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-2 border rounded"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <div className='flex justify-center'>
                        <button type="submit" className="w-[125px] bg-blue-500 text-white py-2 rounded">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;