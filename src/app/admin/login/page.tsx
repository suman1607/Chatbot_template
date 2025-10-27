
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Bot, LogIn } from "lucide-react";
import { useRouter } from 'next/navigation';
import { useAuth } from '@/firebase';
import { initiateEmailSignIn } from '@/firebase/non-blocking-login';
import React, { useState } from 'react';

export default function AdminLoginPage() {
    const router = useRouter();
    const auth = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        
        // In a real app, you would have admin-specific sign-in logic.
        // For this demo, we'll just use the standard email sign-in.
        // And then redirect to the admin dashboard.
        initiateEmailSignIn(auth, email, password);
        
        // A real implementation should wait for auth state to change
        // and verify admin privileges before redirecting.
        setTimeout(() => {
            router.push('/admin/dashboard');
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
                                required 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        {error && <p className="text-sm text-red-500">{error}</p>}
                        <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white">
                            <LogIn className="mr-2 h-4 w-4" /> Sign In
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
