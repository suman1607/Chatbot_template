"use client";

import { Github, Twitter, Linkedin, MessageSquare } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="ChatGenius home page">
      <MessageSquare className="h-7 w-7 text-primary" />
      <span className="text-xl font-bold tracking-tight text-foreground">
        ChatGenius
      </span>
    </Link>
  );
}

export function Footer() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="border-t bg-background">
      <div className="container py-12">
        <div className="grid gap-8 grid-cols-1 md:grid-cols-12">
          <div className="md:col-span-3 flex flex-col gap-4 items-start">
            <Logo />
            <p className="text-muted-foreground text-sm max-w-xs">
              Supercharge your customer support with the power of AI.
            </p>
          </div>
          <div className="md:col-span-9 grid grid-cols-2 sm:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-3">
                <li><Link href="#features" className="text-sm text-muted-foreground hover:text-primary">Features</Link></li>
                <li><Link href="#pricing" className="text-sm text-muted-foreground hover:text-primary">Pricing</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Integrations</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-3">
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">About Us</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Careers</Link></li>
                <li><Link href="#contact" className="text-sm text-muted-foreground hover:text-primary">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-3">
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Blog</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Help Center</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">API Docs</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-3">
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">&copy; {currentYear} ChatGenius. All rights reserved.</p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary"><Twitter className="h-5 w-5" /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary"><Github className="h-5 w-5" /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary"><Linkedin className="h-5 w-5" /></Link>
            </div>
        </div>
      </div>
    </footer>
  );
}