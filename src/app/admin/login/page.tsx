
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Bot, LogIn } from "lucide-react";
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";

export default function AdminLoginPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        
        // TODO: Replace this with your actual authentication logic.
        console.log("Attempting to log in with:", { email, password });

        // For this template, we'll simulate a login attempt.
        setTimeout(() => {
            if (email === "admin@example.com" && password === "password") {
                toast({
                    title: "Login Successful!",
                    description: "Redirecting to your dashboard...",
                });
                router.push('/admin/dashboard');
            } else {
                setError("Invalid credentials. Please try again.");
                setIsLoading(false);
            }
        }, 1000);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <Card className="w-full max-w-md shadow-2xl">
                <CardHeader className="text-center">
                    <div className="flex justify-center items-center gap-2 mb-4">
                        <Bot className="w-8 h-8 text-primary" />
                        <CardTitle className="text-2xl font-bold text-primary">ChatGenius Admin</CardTitle>
                    </div>
                    <CardDescription>Enter your credentials to access the admin panel.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input 
                                id="email" 
                                type="email" 
                                placeholder="admin@example.com" 
                                required 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input 
                                id="password" 
                                type="password" 
                                placeholder="password"
                                required 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        {error && <p className="text-sm text-red-500">{error}</p>}
                        <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white" disabled={isLoading}>
                            {isLoading ? "Signing In..." : <><LogIn className="mr-2 h-4 w-4" /> Sign In</>}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

    