import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MessageSquare, Users, Book, BarChart3, Inbox, Zap } from "lucide-react";

const features = [
  {
    icon: <MessageSquare className="w-8 h-8 text-primary" />,
    title: "AI Chatbot",
    description: "Automate responses and guide users with our intelligent, customizable AI chatbot.",
  },
  {
    icon: <Users className="w-8 h-8 text-primary" />,
    title: "Live Chat",
    description: "Engage with your customers in real-time to provide instant support and build relationships.",
  },
  {
    icon: <Book className="w-8 h-8 text-primary" />,
    title: "Knowledge Base",
    description: "Empower users with a self-service help center, reducing support ticket volume.",
  },
  {
    icon: <BarChart3 className="w-8 h-8 text-primary" />,
    title: "Analytics",
    description: "Gain insights into customer interactions and team performance with powerful analytics.",
  },
  {
    icon: <Inbox className="w-8 h-8 text-primary" />,
    title: "Team Inbox",
    description: "Collaborate on customer conversations in a shared inbox for efficient team workflows.",
  },
  {
    icon: <Zap className="w-8 h-8 text-primary" />,
    title: "Integrations",
    description: "Connect ChatGenius with your favorite tools to streamline your support stack.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 md:py-32 bg-background">
      <div className="container px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">Powerful Features, Seamless Experience</h2>
          <p className="text-muted-foreground md:text-lg mb-12">
            Everything you need to deliver world-class customer support, all in one platform.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-card/40 backdrop-blur-sm border-white/10 hover:border-primary/50 transition-all duration-300">
              <CardHeader>
                <div className="mb-4 p-3 bg-primary/10 rounded-lg w-fit">
                    {feature.icon}
                </div>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription className="pt-2 text-muted-foreground">{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
