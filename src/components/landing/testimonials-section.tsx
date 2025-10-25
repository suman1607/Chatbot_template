import Image from "next/image";
import { Github, Linkedin, MessageSquare, Twitter } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const testimonials = [
  {
    name: "Sarah Johnson",
    handle: "@sjohnson",
    social: "twitter",
    quote:
      "ChatGenius has transformed our customer support. The AI is incredibly accurate, and our team can now focus on high-priority issues. Our response times have decreased by 50%!",
    avatarId: "avatar1",
  },
  {
    name: "Michael Chen",
    handle: "@michael-chen",
    social: "linkedin",
    title: "CEO, Innovate Inc.",
    quote:
      "The seamless integration and powerful analytics have given us invaluable insights into our customer interactions. It's more than a chatbot; it's a core part of our growth strategy.",
    avatarId: "avatar2",
  },
  {
    name: "Emily Rodriguez",
    handle: "@emily-rodriguez",
    social: "github",
    title: "Customer Success Manager, ScaleUp",
    quote:
      "Our team loves the shared inbox. Collaboration has never been easier, and we're resolving tickets faster than ever. ChatGenius is a game-changer for team efficiency.",
    avatarId: "avatar3",
  },
  {
    name: "David Lee",
    handle: "@davidl",
    social: "twitter",
    title: "Founder, Creative Solutions",
    quote:
      "As a small business, we needed a tool that was powerful yet affordable. ChatGenius delivered on all fronts. The setup was a breeze, and we saw an immediate impact on customer satisfaction.",
    avatarId: "avatar4",
  },
  {
    name: "Jessica Williams",
    handle: "@jess-williams",
    social: "linkedin",
    quote:
      "The AI chatbot is surprisingly human-like and handles most of our customer queries, freeing up our agents for more complex issues. A must-have tool!",
    avatarId: "avatar1",
  },
  {
    name: "Tom Brown",
    handle: "@tbrown",
    social: "github",
    quote: "The analytics dashboard is a goldmine of data. We've been able to identify key trends and improve our support strategy significantly.",
    avatarId: "avatar2",
  },
];

const SocialIcon = ({ social, className }: { social: string, className?: string }) => {
  const iconProps = { className: cn("w-5 h-5", className) };
  switch (social) {
    case "twitter":
      return <Twitter {...iconProps} />;
    case "linkedin":
      return <Linkedin {...iconProps} />;
    case "github":
      return <Github {...iconProps} />;
    default:
      return <MessageSquare {...iconProps} />;
  }
};

export function TestimonialsSection() {
    const getAvatarUrl = (id: string) => {
        return PlaceHolderImages.find(p => p.id === id)?.imageUrl ?? "https://picsum.photos/seed/1/100/100";
    }
  return (
    <section id="testimonials" className="py-20 md:py-32 relative">
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl h-[30rem] bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/3 -translate-y-2/3 w-full max-w-6xl h-[30rem] bg-purple-500/10 rounded-full blur-3xl" />
        
      <div className="container px-4 relative">
        <div className="text-center max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4">Testimonials</Badge>
          <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4 text-slate-800">
            Public Cheers for Us!
          </h2>
          <p className="text-muted-foreground md:text-lg mb-12">
            Find out how our users are spreading the word!
          </p>
        </div>

        <div className="column-1 md:columns-2 lg:columns-3 gap-6 space-y-6 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
                <div key={index} className="break-inside-avoid p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-slate-200/50">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-4">
                            <Image
                                src={getAvatarUrl(testimonial.avatarId)}
                                alt={`Avatar of ${testimonial.name}`}
                                width={48}
                                height={48}
                                className="rounded-full"
                            />
                            <div>
                                <p className="font-semibold text-slate-800">{testimonial.name}</p>
                                <p className="text-sm text-muted-foreground">{testimonial.handle}</p>
                            </div>
                        </div>
                        <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                            <SocialIcon social={testimonial.social} />
                        </a>
                    </div>
                    <p className="text-slate-600">
                        {testimonial.quote}
                    </p>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
}
