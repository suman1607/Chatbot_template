
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { LogoTicker } from "./logo-ticker";

const ChatbotAnimation = () => {
  const [isEyeOpen, setIsEyeOpen] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsEyeOpen(false);
      setTimeout(() => setIsEyeOpen(true), 200); // Blink duration
    }, 3000); // Time between blinks

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-[300px] h-[250px] md:w-[400px] md:h-[350px] mx-auto">
      <svg
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Shadow */}
        <defs>
          <filter id="soft-shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="5" dy="10" stdDeviation="10" floodColor="#4A90E2" floodOpacity="0.3" />
          </filter>
        </defs>

        {/* Main Body */}
        <path
          d="M 50,20
             Q 20,20 20,50
             L 20,110
             Q 20,140 40,140
             L 45,140
             Q 50,150 55,140
             L 150,140
             Q 180,140 180,110
             L 180,50
             Q 180,20 150,20
             Z"
          fill="url(#body-gradient)"
          filter="url(#soft-shadow)"
        />
        <defs>
            <linearGradient id="body-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: 'white', stopOpacity: 1}} />
                <stop offset="100%" style={{stopColor: '#f0f4ff', stopOpacity: 1}} />
            </linearGradient>
        </defs>


        {/* Eye */}
        <g transform="translate(100, 80)">
          <circle cx="0" cy="0" r="25" fill="#4A90E2" />
          <circle cx="0" cy="0" r="12" fill="white" className="transition-transform duration-200 ease-in-out" style={{ transform: isEyeOpen ? 'scale(1)' : 'scale(1.1)' }}/>
          <path
            d="M -18,0
               a 18,18 0 0,1 36,0"
            fill="transparent"
            stroke="white"
            strokeWidth="3"
            className={cn("transition-all duration-300 ease-in-out origin-center", {
                'stroke-opacity-0': isEyeOpen,
            })}
            style={{
              transform: isEyeOpen ? 'scaleY(0)' : 'scaleY(1)',
            }}
          />
        </g>
        
        {/* Typing indicator dots */}
        <g transform="translate(85, 120)">
            <circle cx="0" cy="0" r="4" fill="#cbd5e1" className="animate-bounce" style={{animationDelay: '0s'}}/>
            <circle cx="15" cy="0" r="4" fill="#cbd5e1" className="animate-bounce" style={{animationDelay: '0.2s'}}/>
            <circle cx="30" cy="0" r="4" fill="#cbd5e1" className="animate-bounce" style={{animationDelay: '0.4s'}}/>
        </g>

      </svg>
    </div>
  );
};


export function HeroSection() {
  return (
    <section className="py-20 md:py-32 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full" aria-hidden="true">
        <div className="absolute top-[-20%] left-[-20%] w-[50rem] h-[50rem] bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[-20%] right-[-20%] w-[50rem] h-[50rem] bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-[30%] right-[10%] w-[30rem] h-[30rem] bg-pink-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container px-4 text-center relative">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-6 font-headline text-slate-800">
          Supercharge Your Customer Support with AI
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
          ChatGenius provides an all-in-one solution to manage customer conversations, automate support, and drive satisfaction.
        </p>

        <div className="flex justify-center gap-4 mb-16">
          <Button size="lg" asChild className="shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-shadow">
            <Link href="#pricing">
                Get Started for Free <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button size="lg" variant="outline">
            Book a Demo
          </Button>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
            <div className="absolute -top-8 -left-8 w-24 h-24 bg-purple-200/50 rounded-full blur-2xl opacity-60 animate-blob"></div>
            <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-blue-200/50 rounded-full blur-2xl opacity-60 animate-blob animation-delay-2000"></div>

            <ChatbotAnimation />
        </div>
      </div>
      <LogoTicker />
    </section>
  );
}
