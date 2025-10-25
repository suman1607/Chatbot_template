
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AuthForm } from "./auth-form";
import { useState } from "react";

type AuthDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
};

export function AuthDialog({ open, onOpenChange, children }: AuthDialogProps) {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {children}
      <DialogContent className="p-0 max-w-sm rounded-2xl border-0 bg-transparent shadow-none">
        <AuthForm
          isLogin={isLogin}
          onToggle={() => setIsLogin(!isLogin)}
        />
      </DialogContent>
    </Dialog>
  );
}
