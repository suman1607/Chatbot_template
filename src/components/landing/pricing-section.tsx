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
  },
];

export function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section id="pricing" className="py-20 md:py-32">
      <div className="container px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">Find the Perfect Plan</h2>
          <p className="text-muted-foreground md:text-lg mb-8">
            Start for free, then grow with us. Choose the plan that's right for your business.
          </p>
        </div>

        <div className="flex justify-center items-center space-x-4 mb-12">
          <span>Monthly</span>
          <Switch checked={isYearly} onCheckedChange={setIsYearly} aria-label="Toggle billing cycle" />
          <div className="flex items-center">
            <span>Yearly</span>
            <Badge variant="outline" className="ml-2 border-green-500 text-green-600 bg-green-50">Save 2 months</Badge>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto items-center">
          {pricingTiers.map((tier) => (
            <div
              key={tier.name}
              className={cn(
                "relative bg-white rounded-xl shadow-lg transition-all duration-300 flex flex-col",
                tier.isPopular ? "py-8" : "py-8"
              )}
            >
              {tier.isPopular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[110%] h-full bg-accent rounded-xl" />
              )}
              
              <div className={cn("relative z-10 text-center flex flex-col h-full px-8 pb-8", tier.isPopular ? "pt-0" : "pt-8" )}>
                 {tier.isPopular && (
                    <div className="bg-accent text-primary-foreground py-8 rounded-t-xl -mx-8 mb-8">
                       <h3 className="text-2xl font-semibold">{tier.name}</h3>
                    </div>
                )}
                {!tier.isPopular && (
                    <h3 className="text-2xl font-semibold text-accent">{tier.name}</h3>
                )}

                <div className={cn("my-8", tier.isPopular ? 'text-primary-foreground' : 'text-slate-900' )}>
                  <span className="text-5xl font-bold">
                    ${isYearly ? Math.floor(tier.yearlyPrice / 12) : tier.monthlyPrice}
                  </span>
                  <span className={cn("text-lg ml-1", tier.isPopular ? "text-blue-200" : "text-muted-foreground")}>
                    /month
                  </span>
                  {isYearly && <p className={cn("text-sm mt-1", tier.isPopular ? "text-blue-200" : "text-muted-foreground")}>Billed as ${tier.yearlyPrice}/year</p>}
                </div>

                <ul className={cn("space-y-4 text-left flex-grow", tier.isPopular ? "text-blue-100" : "text-slate-600")}>
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className={cn("w-5 h-5 mr-3 shrink-0", tier.isPopular ? "text-blue-300" : "text-primary")} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-10">
                  <Button className="w-full" size="lg" variant={tier.isPopular ? "secondary" : "outline"}>
                    Select Plan
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
