"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const pricingTiers = [
  {
    name: "Starter",
    description: "For individuals and small teams just getting started.",
    monthlyPrice: 29,
    yearlyPrice: 290,
    features: [
      "1 AI Chatbot",
      "Live Chat for 1 agent",
      "Basic Knowledge Base",
      "Standard Analytics",
    ],
    isPopular: false,
    gradientClass: "from-orange-100/70 to-white",
    waveColor: "text-orange-200/80",
  },
  {
    name: "Pro",
    description: "For growing businesses that need more power and automation.",
    monthlyPrice: 79,
    yearlyPrice: 790,
    features: [
      "5 AI Chatbots",
      "Live Chat for 5 agents",
      "Advanced Knowledge Base",
      "Advanced Analytics",
      "Team Inbox",
      "Basic Integrations",
    ],
    isPopular: true,
    gradientClass: "from-purple-100/70 to-white",
    waveColor: "text-purple-200/80",
  },
  {
    name: "Business",
    description: "For large organizations with complex support needs.",
    monthlyPrice: 199,
    yearlyPrice: 1990,
    features: [
      "Unlimited AI Chatbots",
      "Live Chat for unlimited agents",
      "Customizable Knowledge Base",
      "Enterprise-grade Analytics",
      "Advanced Team Inbox features",
      "Premium Integrations",
    ],
    isPopular: false,
    gradientClass: "from-blue-100/70 to-white",
    waveColor: "text-blue-200/80",
  },
];

const CheckIcon = () => (
    <div className="w-5 h-5 bg-slate-800 text-white rounded-full flex items-center justify-center shrink-0">
        <Check className="w-3.5 h-3.5" />
    </div>
);

const WavyBg = ({ className }: { className?: string }) => (
    <svg className={cn("absolute bottom-0 left-0 w-full h-auto opacity-50", className)} viewBox="0 0 357 183" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M357 101.5C357 101.5 288.799 174.5 178.5 174.5C68.201 174.5 0 101.5 0 101.5V183H357V101.5Z" fill="currentColor"/>
    </svg>
);


export function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section id="pricing" className="py-20 md:py-32">
      <div className="container px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4 text-slate-800">Find the Perfect Plan</h2>
          <p className="text-muted-foreground md:text-lg mb-8">
            Start for free, then grow with us. Choose the plan that's right for your business.
          </p>
        </div>

        <div className="flex justify-center items-center space-x-4 mb-12">
          <span className="font-medium text-slate-600">Monthly</span>
          <Switch checked={isYearly} onCheckedChange={setIsYearly} aria-label="Toggle billing cycle" />
          <div className="flex items-center">
            <span className="font-medium text-slate-600">Yearly</span>
            <Badge variant="outline" className="ml-2 border-green-500/50 text-green-700 bg-green-50 font-medium">Save 16%</Badge>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto items-start">
          {pricingTiers.map((tier) => (
            <div
              key={tier.name}
              className={cn(
                "relative bg-white/60 rounded-2xl shadow-lg transition-all duration-300 flex flex-col overflow-hidden backdrop-blur-sm",
                tier.isPopular ? "border-2 border-primary shadow-primary/20" : "border border-slate-200"
              )}
            >
              <div className={cn("absolute inset-0 bg-gradient-to-br -z-10", tier.gradientClass)} />
              <WavyBg className={tier.waveColor} />

              <div className="relative z-10 p-8 flex flex-col h-full">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold text-slate-800">{tier.name}</h3>
                  {tier.isPopular && (
                    <Badge variant="default" className="bg-primary hover:bg-primary">
                      Most Popular
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground mt-2 min-h-[40px]">{tier.description}</p>
                
                <div className="my-8">
                  <span className="text-5xl font-extrabold text-slate-900 tracking-tight">
                    ${isYearly ? Math.floor(tier.yearlyPrice / 12) : tier.monthlyPrice}
                  </span>
                  <span className="text-lg ml-1 font-medium text-muted-foreground">
                    /month
                  </span>
                </div>
                
                <div className="mt-auto">
                    <Button className="w-full" size="lg" variant={tier.isPopular ? "default" : "outline"}>
                        Select Plan
                    </Button>

                    <ul className="space-y-4 text-left mt-8 flex-grow">
                    {tier.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                        <CheckIcon />
                        <span className="ml-3 text-slate-600">{feature}</span>
                        </li>
                    ))}
                    </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
