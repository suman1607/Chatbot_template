import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Link from "next/link";

const heroImage = PlaceHolderImages.find(p => p.id === "hero");

const TrustBadges = () => (
    <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4">
        <p className="text-sm font-semibold text-muted-foreground">TRUSTED BY TEAMS AT</p>
        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4">
            <svg role="img" aria-label="Company One logo" className="h-6 text-muted-foreground" viewBox="0 0 100 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.333 24L0 0h12.5l-4.333 24H4.333zM25 24V0h12v12h-8v12H25zM48 24l-4-12-4 12H36l6-18 6 18h-4zM69 24V0h12v24H69zM65 12a4 4 0 11-8 0 4 4 0 018 0zM83 24V0h4l8 12V0h4v24h-4l-8-12v12h-4z" fill="currentColor"/>
            </svg>
            <svg role="img" aria-label="Company Two logo" className="h-6 text-muted-foreground" viewBox="0 0 100 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 24V0h30v4H4v8h22v4H4v8h26v4H0zM40 24V0h12.5L44.333 18H55V0h4v24h-4V6H48.333L52.5 24H40zM71 24c-6.627 0-12-5.373-12-12S64.373 0 71 0s12 5.373 12 12-5.373 12-12 12zm0-4c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zM100 24v-4h-2a6 6 0 01-6-6V6a6 6 0 016-6h2V0h-2c-5.523 0-10 4.477-10 10v4c0 5.523 4.477 10 10 10h2z" fill="currentColor"/>
            </svg>
             <svg role="img" aria-label="Company Three logo" className="h-6 text-muted-foreground" viewBox="0 0 100 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 12c0-6.627 5.373-12 12-12h4c6.627 0 12 5.373 12 12s-5.373 12-12 12h-4C5.373 24 0 18.627 0 12zm24 0c0-4.418-3.582-8-8-8h-4c-4.418 0-8 3.582-8 8s3.582 8 8 8h4c4.418 0 8-3.582 8-8zM36 24V0h4v24h-4zM54 24V0h18v4H58v6h12v4H58v6h14v4H54zM80 24l8-24h4l8 24h-4.5l-2-6h-7l-2 6H80zm6.5-10L84 5l-2.5 9h5z" fill="currentColor"/>
            </svg>
        </div>
    </div>
);


const Stats = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="text-center">
            <p className="text-4xl font-bold text-primary">10k+</p>
            <p className="text-muted-foreground">Active Users</p>
        </div>
        <div className="text-center">
            <p className="text-4xl font-bold text-primary">25k+</p>
            <p className="text-muted-foreground">Tickets Solved</p>
        </div>
        <div className="text-center">
            <p className="text-4xl font-bold text-primary">98%</p>
            <p className="text-muted-foreground">Satisfaction Rate</p>
        </div>
        <div className="text-center">
            <p className="text-4xl font-bold text-primary">24/7</p>
            <p className="text-muted-foreground">Support</p>
        </div>
    </div>
)

export function HeroSection() {
  if (!heroImage) return null;

  return (
    <section className="py-20 md:py-32">
      <div className="container px-4 text-center">
        <div className="flex justify-center items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 max-w-fit mx-auto mb-4">
            <Star className="w-4 h-4 text-primary fill-primary" />
            <p className="text-sm text-primary font-medium">Loved by teams worldwide</p>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-6 font-headline">
          Supercharge Your Customer Support with AI
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
          ChatGenius provides an all-in-one solution to manage customer conversations, automate support, and drive satisfaction.
        </p>

        <div className="flex justify-center gap-4 mb-16">
          <Button size="lg" asChild>
            <Link href="#pricing">
                Get Started for Free <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button size="lg" variant="outline">
            Book a Demo
          </Button>
        </div>
        
        <div className="relative rounded-xl shadow-2xl max-w-5xl mx-auto">
            <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                data-ai-hint={heroImage.imageHint}
                width={1200}
                height={800}
                className="rounded-xl"
                priority
            />
        </div>
      </div>
      <div className="container px-4 mt-24">
        <Stats />
      </div>
      <div className="container px-4 mt-24">
        <TrustBadges />
      </div>
    </section>
  );
}
