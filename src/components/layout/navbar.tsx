"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, MessageSquare } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { GetStartedButton } from "@/components/ui/get-started-button";

const menuItems = [
  { name: "Features", href: "#features" },
  { name: "Pricing", href: "#pricing" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "FAQ", href: "#faq" },
];

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="ChatGenius home page">
      <MessageSquare className="h-8 w-8 text-primary" />
      <span className="text-xl font-bold tracking-tight text-foreground">
        ChatGenius
      </span>
    </Link>
  );
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll(); 
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300",
      isScrolled ? "border-b bg-background/80 backdrop-blur-sm" : ""
    )}>
      <div className="container flex h-20 items-center">
        <div className="flex items-center md:flex-1">
          <Logo />
        </div>
        
        <nav className="hidden md:flex items-center justify-center space-x-8 text-base font-medium">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-foreground/70 transition-colors hover:text-foreground"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex flex-1 items-center justify-end space-x-2">
           <GetStartedButton />
        </div>
        
        {isClient && (
          <Sheet>
            <SheetTrigger asChild className="ml-4 md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px]">
              <div className="p-6">
                  <div className="mb-8">
                      <Logo />
                  </div>
                  <nav className="flex flex-col space-y-6">
                    {menuItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="text-lg font-medium text-foreground hover:text-primary"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </nav>
                  <div className="mt-8 flex flex-col space-y-3 border-t pt-6">
                      <GetStartedButton />
                  </div>
              </div>
            </SheetContent>
          </Sheet>
        )}
        
      </div>
    </header>
  );
}
