import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const features = [
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" rx="12" fill="hsl(var(--primary))" fillOpacity="0.1"/>
        <path d="M20 15V13" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M20 27V25" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M15.9393 15.9393L14.5251 14.5251" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M25.4749 25.4749L24.0607 24.0607" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M27 20H25" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M15 20H13" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M24.0607 15.9393L25.4749 14.5251" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14.5251 25.4749L15.9393 24.0607" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="14" y="14" width="12" height="12" rx="6" fill="hsl(var(--primary))" fillOpacity="0.2"/>
        <circle cx="20" cy="20" r="2" fill="hsl(var(--primary))"/>
      </svg>
    ),
    title: "AI Chatbot",
    description: "Automate responses and guide users with our intelligent, customizable AI chatbot.",
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" rx="12" fill="hsl(var(--primary))" fillOpacity="0.1"/>
        <path d="M28 15H12C11.4477 15 11 15.4477 11 16V22C11 22.5523 11.4477 23 12 23H22L28 27V16C28 15.4477 27.5523 15 27 15" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="hsl(var(--primary))" fillOpacity="0.2"/>
        <path d="M18 19H22" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Live Chat",
    description: "Engage with your customers in real-time to provide instant support and build relationships.",
  },
  {
    icon: (
       <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" rx="12" fill="hsl(var(--primary))" fillOpacity="0.1"/>
        <path d="M14 27V14C14 13.4477 14.4477 13 15 13H25C25.5523 13 26 13.4477 26 14V27L20 24L14 27Z" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="hsl(var(--primary))" fillOpacity="0.2"/>
        <path d="M18 19H22" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Knowledge Base",
    description: "Empower users with a self-service help center, reducing support ticket volume.",
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" rx="12" fill="hsl(var(--primary))" fillOpacity="0.1"/>
        <rect x="13" y="19" width="5" height="8" rx="1" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="hsl(var(--primary))" fillOpacity="0.2"/>
        <rect x="22" y="13" width="5" height="14" rx="1" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="hsl(var(--primary))" fillOpacity="0.2"/>
      </svg>
    ),
    title: "Analytics",
    description: "Gain insights into customer interactions and team performance with powerful analytics.",
  },
  {
    icon: (
       <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" rx="12" fill="hsl(var(--primary))" fillOpacity="0.1"/>
        <rect x="13" y="13" width="14" height="14" rx="2" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="hsl(var(--primary))" fillOpacity="0.2"/>
        <path d="M18 19H22" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M20 17V21" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Team Inbox",
    description: "Collaborate on customer conversations in a shared inbox for efficient team workflows.",
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" rx="12" fill="hsl(var(--primary))" fillOpacity="0.1"/>
        <path d="M22 13H27V18" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M18 27H13V22" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M20 20L27 13" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M20 20L13 27" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Integrations",
    description: "Connect ChatGenius with your favorite tools to streamline your support stack.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 md:py-32 relative">
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/3 -translate-y-2/3 w-[30rem] h-[30rem] bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-2/3 -translate-y-1/3 w-[30rem] h-[30rem] bg-pink-500/10 rounded-full blur-3xl" />
      <div className="container px-4 relative">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4 text-slate-800">Powerful Features, Seamless Experience</h2>
          <p className="text-muted-foreground md:text-lg mb-12">
            Everything you need to deliver world-class customer support, all in one platform.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300 group">
              <CardHeader className="items-start text-left">
                <div className="mb-4">
                    {feature.icon}
                </div>
                <CardTitle className="text-lg font-semibold text-slate-800">{feature.title}</CardTitle>
                <CardDescription className="pt-1 text-muted-foreground">{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
