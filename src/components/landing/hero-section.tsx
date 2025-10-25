import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Link from "next/link";

const heroImage = PlaceHolderImages.find(p => p.id === "hero");

const TrustBadges = () => (
    <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 mt-16">
        <p className="text-sm font-semibold text-muted-foreground">TRUSTED BY TEAMS AT</p>
        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4">
            <svg role="img" aria-label="Slack logo" className="h-6 text-muted-foreground" viewBox="0 0 94 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M4.31.25a2.16 2.16 0 0 0-2.16 2.16v4.31h4.32V2.41a2.16 2.16 0 0 0-2.16-2.16Zm0 8.63a2.16 2.16 0 1 0 0 4.31V8.75h0Zm0 4.31a2.16 2.16 0 0 0 2.16 2.16H8.7v-4.32h-4.4v2.16h.01Zm2.16 2.16a2.16 2.16 0 0 0 4.32 0V8.75h-4.32v6.48Zm8.63 0a2.16 2.16 0 0 0 2.16-2.16V8.75H10.8v4.32h4.32Zm0-8.63a2.16 2.16 0 1 0 0-4.32h0v4.32Zm0-4.32a2.16 2.16 0 0 0-2.16-2.16v4.32h4.32V2.41h-2.16Zm-2.16-2.16a2.16 2.16 0 0 0-4.32 0v6.48h4.32V.25ZM25.33 7.87a8.55 8.55 0 0 0-8.63 8.63 8.55 8.55 0 0 0 8.63 8.62 8.55 8.55 0 0 0 8.63-8.62 8.55 8.55 0 0 0-8.63-8.63Zm0 13.91a5.29 5.29 0 0 1-5.29-5.29 5.29 5.29 0 0 1 5.29-5.28 5.29 5.29 0 0 1 5.29 5.28 5.29 5.29 0 0 1-5.29 5.29ZM40.54 7.87v15.1h3.42V11.23h5.1v-3.36h-8.52Zm12.7 0v3.36h6.05v11.74h3.42V11.23h6.05V7.87h-15.52ZM70.36 23l-7-8.92h4.2l4.87 6.2 4.88-6.2h4.2l-7 8.92V23h-3.15V23h-.01Z"></path></svg>
            <svg role="img" aria-label="Notion logo" className="h-6 text-muted-foreground" viewBox="0 0 88 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M12.3 2.7H2.8v19.6h9.5V2.7Zm-2.4 17.2H5.2v-2.3h4.7v2.3Zm0-4.7H5.2v-2.3h4.7v2.3Zm0-4.7H5.2V8h4.7v2.3Zm0-4.7H5.2V3.3h4.7V6ZM27.3 2.7l-7.7 13.5L27.2 2.7h10.4v19.6h-7.8V8.8l7.5 13.5h-9.9L19.8 8.8v13.5h-7.5V2.7h7.1l7.9 13.5L34.9 2.7h-7.6v0ZM52.4 2.7 44 14l-1.3-2.3-5.2-9H30v19.6h7.5V9.4l6.5 10.1 1.2 2.8h2.3l6.5-11.2V22.3H60V2.7h-7.6v0ZM72.6 2.7h-9.5v19.6h9.5v-2.3h-4.7v-4.8h4.7v-2.3h-4.7V5h4.7V2.7ZM88.2 2.7H78.7v19.6h9.5V2.7Zm-2.4 17.2h-4.7v-2.3h4.7v2.3Zm0-4.7h-4.7v-2.3h4.7v2.3Zm0-4.7h-4.7V8h4.7v2.3Zm0-4.7h-4.7V3.3h4.7V6Z"></path></svg>
            <svg role="img" aria-label="Dropbox logo" className="h-6 text-muted-foreground" viewBox="0 0 120 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="m11.2 2.1-11.2 7 11.2 7 11.2-7-11.2-7Zm11.2 7v14l-11.2-7V9.1l11.2 7ZM0 9.1v7l11.2 7V16.1L0 9.1Zm11.2 21 11.2-7-11.2-7-11.2 7 11.2 7Zm33.6-21a8.3 8.3 0 0 0-8.4 8.3c0 4.6 3.8 8.3 8.4 8.3s8.4-3.7 8.4-8.3S50.4 2.1 44.8 2.1Zm0 13.3a5 5 0 0 1-5-5 5 5 0 0 1 5-5 5 5 0 0 1 5 5 5 5 0 0 1-5 5Zm15-13.3v16.6h3.2V5.4h5.2V2.1h-8.4Zm20.8 13.5a5.2 5.2 0 0 1-5.7 3.1 5.2 5.2 0 0 1-5.6-5.4c0-3.6 2.3-5.4 5.6-5.4 1.3 0 2.4.2 3.4.6l-.7 2.8c-.8-.3-1.6-.5-2.6-.5-1.5 0-2.3 1-2.3 2.5s.8 2.5 2.3 2.5c1.4 0 2.4-.4 3.4-1V12h-3.4V9.2h6.8v6.4ZM91.2 2.1l-4.5 16.6h3.4l1-3.6h5.2l1 3.6h3.4l-4.5-16.6h-5Zm.6 10.8 2-7.2 2 7.2h-4Zm28.1-10.8a8.3 8.3 0 0 0-8.4 8.3c0 4.6 3.8 8.3 8.4 8.3s8.4-3.7 8.4-8.3c0-4.6-3.8-8.3-8.4-8.3Zm0 13.3a5 5 0 0 1-5-5 5 5 0 0 1 5-5 5 5 0 0 1 5 5 5 5 0 0 1-5 5Z"></path></svg>
            <svg role="img" aria-label="Shopify logo" className="h-6 text-muted-foreground" viewBox="0 0 94 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M19.1 7.1a6.4 6.4 0 0 0-6.4 6.4c0 3.5 2.9 6.4 6.4 6.4a6.3 6.3 0 0 0 6.3-5.4h-5.2v-3h8.3c.1.5.2 1 .2 1.6 0 5.1-3.4 8.7-8.5 8.7-4.9 0-8.8-3.9-8.8-8.7a8.8 8.8 0 0 1 8.8-8.8c2.4 0 4.5 1 6.1 2.5l-2.1 2.2a3.7 3.7 0 0 0-4-1.5ZM38.4 8.9c-3.1 0-5.6 2.5-5.6 5.6s2.5 5.6 5.6 5.6 5.6-2.5 5.6-5.6-2.5-5.6-5.6-5.6Zm0 8.8c-1.8 0-3.2-1.4-3.2-3.2s1.4-3.2 3.2-3.2 3.2 1.4 3.2 3.2-1.4 3.2-3.2 3.2Zm16.8-8.8c-3.1 0-5.6 2.5-5.6 5.6s2.5 5.6 5.6 5.6 5.6-2.5 5.6-5.6-2.5-5.6-5.6-5.6Zm0 8.8c-1.8 0-3.2-1.4-3.2-3.2s1.4-3.2 3.2-3.2 3.2 1.4 3.2 3.2-1.4 3.2-3.2 3.2ZM68.1 9v11.8h-2.5V11.2l-4.1 9.6h-1.8l-4-9.6v9.6h-2.5V9h4l5.1 11 5-11h4.2V9h-3.4Zm17.8.2a5.5 5.5 0 0 0-5.5 5.7c0 3.1 2.5 5.7 5.5 5.7 1.4 0 2.7-.5 3.6-1.4l-1.6-1.7a2.5 2.5 0 0 1-2 .7 3.2 3.2 0 0 1-3.2-3.3c0-1.8 1.5-3.3 3.2-3.3a2.9 2.9 0 0 1 2.7 1.7h-2.6v2.2h5.5c0-.3.1-.6.1-.9 0-3.3-2.4-5.8-5.5-5.8Z"></path></svg>
        </div>
    </div>
);


export function HeroSection() {
  if (!heroImage) return null;

  return (
    <section className="py-20 md:py-32 bg-background relative overflow-hidden">
        <div 
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-background/0 to-background/0"
            aria-hidden="true"
        />
      <div className="container px-4 text-center relative">
        
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-6 font-headline bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
          Supercharge Your Customer Support with AI
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
          ChatGenius provides an all-in-one solution to manage customer conversations, automate support, and drive satisfaction.
        </p>

        <div className="flex justify-center gap-4 mb-16">
          <Button size="lg" asChild className="bg-blue-600 hover:bg-blue-700 text-white">
            <Link href="#pricing">
                Get Started for Free <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button size="lg" variant="outline">
            Book a Demo
          </Button>
        </div>
        
        <div className="relative rounded-xl shadow-2xl max-w-5xl mx-auto border border-white/10">
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
      <div className="container px-4">
        <TrustBadges />
      </div>
    </section>
  );
}
