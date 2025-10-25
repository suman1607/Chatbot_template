import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const testimonials = [
  {
    name: "Sarah Johnson",
    title: "Support Lead, TechCorp",
    quote:
      "ChatGenius has transformed our customer support. The AI is incredibly accurate, and our team can now focus on high-priority issues. Our response times have decreased by 50%!",
    avatarId: "avatar1",
  },
  {
    name: "Michael Chen",
    title: "CEO, Innovate Inc.",
    quote:
      "The seamless integration and powerful analytics have given us invaluable insights into our customer interactions. It's more than a chatbot; it's a core part of our growth strategy.",
    avatarId: "avatar2",
  },
  {
    name: "Emily Rodriguez",
    title: "Customer Success Manager, ScaleUp",
    quote:
      "Our team loves the shared inbox. Collaboration has never been easier, and we're resolving tickets faster than ever. ChatGenius is a game-changer for team efficiency.",
    avatarId: "avatar3",
  },
    {
    name: "David Lee",
    title: "Founder, Creative Solutions",
    quote:
      "As a small business, we needed a tool that was powerful yet affordable. ChatGenius delivered on all fronts. The setup was a breeze, and we saw an immediate impact on customer satisfaction.",
    avatarId: "avatar4",
  },
];

export function TestimonialsSection() {
    const getAvatarUrl = (id: string) => {
        return PlaceHolderImages.find(p => p.id === id)?.imageUrl ?? "https://picsum.photos/seed/1/100/100";
    }
  return (
    <section id="testimonials" className="py-20 md:py-32 bg-background">
      <div className="container px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4 text-slate-800">
            Loved by Teams Worldwide
          </h2>
          <p className="text-muted-foreground md:text-lg mb-12">
            See what our customers have to say about how ChatGenius has revolutionized their support.
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-4 h-full">
                  <Card className="h-full flex flex-col justify-between bg-white shadow-lg rounded-xl">
                    <CardContent className="p-6 flex flex-col items-start text-left gap-4">
                        <p className="text-muted-foreground italic">
                            "{testimonial.quote}"
                        </p>
                        <div className="flex items-center gap-4 pt-4 border-t w-full">
                            <Image
                                src={getAvatarUrl(testimonial.avatarId)}
                                alt={`Avatar of ${testimonial.name}`}
                                width={48}
                                height={48}
                                className="rounded-full"
                            />
                            <div>
                                <p className="font-semibold text-slate-800">{testimonial.name}</p>
                                <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                            </div>
                        </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </div>
    </section>
  );
}
