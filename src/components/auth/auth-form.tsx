
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useAuth } from "@/firebase";
import { initiateEmailSignUp, initiateEmailSignIn } from "@/firebase/non-blocking-login";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";


const GoogleIcon = () => (
    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 488 512">
        <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" fill="currentColor"/>
    </svg>
);

const AppleIcon = () => (
    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512">
        <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" fill="currentColor"/>
    </svg>
);

const TwitterIcon = () => (
    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
        <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" fill="currentColor"/>
    </svg>
);

type AuthFormProps = {
    isLogin: boolean;
    onToggle: () => void;
    onSuccess: () => void;
};

export function AuthForm({ isLogin, onToggle, onSuccess }: AuthFormProps) {
  const auth = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
        if(isLogin) {
            initiateEmailSignIn(auth, email, password);
        } else {
            initiateEmailSignUp(auth, email, password);
        }
        onSuccess();
        toast({ title: isLogin ? 'Signed in successfully' : 'Signed up successfully' });
    } catch (error: any) {
        toast({ variant: 'destructive', title: 'Error', description: error.message });
    }
  };

  return (
    <div className="max-w-sm rounded-[40px] bg-gradient-to-b from-[#f4f7fb] to-white p-8 border-[5px] border-white shadow-[0_30px_30px_-20px_rgba(133,189,215,0.88)] m-5">
      <h2 className="text-center text-3xl font-black text-blue-600">{isLogin ? "Sign In" : "Sign Up"}</h2>
      
      <form className="mt-5" onSubmit={handleSubmit}>
        {!isLogin && (
            <Input required className="mt-4 h-12 w-full rounded-2xl border-2 border-transparent bg-white px-5 shadow-[0px_10px_10px_-5px_#cff0ff] focus:border-cyan-400 focus:outline-none" type="text" name="name" id="name" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
        )}
        <Input required className="mt-4 h-12 w-full rounded-2xl border-2 border-transparent bg-white px-5 shadow-[0px_10px_10px_-5px_#cff0ff] focus:border-cyan-400 focus:outline-none" type="email" name="email" id="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input required className="mt-4 h-12 w-full rounded-2xl border-2 border-transparent bg-white px-5 shadow-[0px_10px_10px_-5px_#cff0ff] focus:border-cyan-400 focus:outline-none" type="password" name="password" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        
        {isLogin && (
            <Link href="#" className="mt-2.5 ml-2.5 block text-xs text-cyan-500 no-underline">
                Forgot Password?
            </Link>
        )}
        
        <Button type="submit" className="mt-5 block h-auto w-full rounded-2xl border-none bg-gradient-to-r from-blue-600 to-cyan-500 p-4 font-bold text-white shadow-[0px_20px_10px_-15px_rgba(133,189,215,0.88)] transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-[0px_23px_10px_-20px_rgba(133,189,215,0.88)] active:scale-95 active:shadow-[0px_15px_10px_-10px_rgba(133,189,215,0.88)]">
            {isLogin ? "Sign In" : "Sign Up"}
        </Button>
      </form>
      
      <div className="mt-6">
        <p className="text-center text-xs text-gray-400">Or {isLogin ? "Sign in" : "Sign up"} with</p>
        <div className="mt-1 flex justify-center gap-4">
          <Button variant="outline" size="icon" className="h-10 w-10 rounded-full border-white border-4 bg-gradient-to-r from-black to-gray-700 text-white shadow-[0px_12px_10px_-8px_rgba(133,189,215,0.88)] transition-all duration-200 ease-in-out hover:scale-125 active:scale-90">
            <GoogleIcon />
          </Button>
          <Button variant="outline" size="icon" className="h-10 w-10 rounded-full border-white border-4 bg-gradient-to-r from-black to-gray-700 text-white shadow-[0px_12px_10px_-8px_rgba(133,189,215,0.88)] transition-all duration-200 ease-in-out hover:scale-125 active:scale-90">
            <AppleIcon />
          </Button>
          <Button variant="outline" size="icon" className="h-10 w-10 rounded-full border-white border-4 bg-gradient-to-r from-black to-gray-700 text-white shadow-[0px_12px_10px_-8px_rgba(133,189,215,0.88)] transition-all duration-200 ease-in-out hover:scale-125 active:scale-90">
            <TwitterIcon />
          </Button>
        </div>
      </div>

      <div className="mt-4 text-center text-sm">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
        <button onClick={onToggle} className="font-semibold text-blue-600 hover:underline">
          {isLogin ? "Sign Up" : "Sign In"}
        </button>
      </div>

      <div className="mt-4 text-center">
        <Link href="#" className="text-[9px] text-cyan-500 no-underline">
            Learn user licence agreement
        </Link>
      </div>
    </div>
  );
}
