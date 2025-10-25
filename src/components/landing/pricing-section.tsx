"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
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

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto items-start">
          {pricingTiers.map((tier) => (
            <Card key={tier.name} className={cn(
              "flex flex-col h-full bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300",
              tier.isPopular ? "border-2 border-primary shadow-primary/20" : "border"
            )}>
              {tier.isPopular && (
                <Badge className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg">Most Popular</Badge>
              )}
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-slate-800">{tier.name}</CardTitle>
                <CardDescription className="text-muted-foreground">{tier.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="mb-8">
                  <span className="text-5xl font-bold text-slate-900">${isYearly ? Math.floor(tier.yearlyPrice / 12) : tier.monthlyPrice}</span>
                  <span className="text-muted-foreground">/month</span>
                  {isYearly && <p className="text-sm text-muted-foreground mt-1">Billed as ${tier.yearlyPrice}/year</p>}
                </div>
                <ul className="space-y-4">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="w-5 h-5 text-primary mr-3 shrink-0" />
                      <span className="text-slate-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" size="lg" variant={tier.isPopular ? "default" : "outline"}>
                  Get Started
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
