
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AuthForm } from "./auth-form";
import { useState } from "react";
import { cn } from "@/lib/utils";

type AuthDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
};

export function AuthDialog({ open, onOpenChange, children }: AuthDialogProps) {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="p-0 max-w-sm rounded-2xl border-0 bg-transparent shadow-none">
        <DialogHeader className="sr-only">
          <DialogTitle>{isLogin ? "Sign In" : "Sign Up"}</DialogTitle>
        </DialogHeader>
        <AuthForm
          isLogin={isLogin}
          onToggle={() => setIsLogin(!isLogin)}
          onSuccess={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
