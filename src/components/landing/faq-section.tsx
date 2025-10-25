import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const faqData = [
    {
        question: "What is ChatGenius?",
        answer: "ChatGenius is an all-in-one customer support platform that uses AI to help you manage conversations, automate support, and improve customer satisfaction."
    },
    {
        question: "How does the AI chatbot work?",
        answer: "Our AI chatbot is powered by advanced natural language processing (NLP) to understand and respond to customer queries in real-time. It can be trained on your knowledge base to provide accurate and relevant answers."
    },
    {
        question: "Can I customize the look of the chat widget?",
        answer: "Yes! You can fully customize the appearance of the chat widget to match your brand's colors, fonts, and style. You have control over every visual element."
    },
    {
        question: "What integrations do you offer?",
        answer: "ChatGenius integrates with a wide range of popular tools, including CRMs, e-commerce platforms, and help desk software. We are always adding new integrations based on customer feedback."
    },
    {
        question: "Is there a free trial available?",
        answer: "Yes, we offer a 14-day free trial on our Pro plan. You can explore all the features and see how ChatGenius can benefit your business without any commitment."
    }
];


const FaqIllustration = () => (
    <svg width="450" height="400" viewBox="0 0 450 400" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="5" dy="10" stdDeviation="15" floodColor="hsl(var(--primary))" floodOpacity="0.1" />
            </filter>
        </defs>
        <g filter="url(#shadow)">
            {/* Question bubble */}
            <path d="M125 75C125 61.1929 136.193 50 150 50H300C313.807 50 325 61.1929 325 75V125C325 138.807 313.807 150 300 150H250L225 175L200 150H150C136.193 150 125 138.807 125 125V75Z" fill="white" stroke="hsl(var(--border))" strokeWidth="2"/>
            <text x="225" y="105" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="36" fontWeight="bold" fill="hsl(var(--primary))">?</text>

            {/* Answer bubble */}
            <path d="M175 225C175 211.193 186.193 200 200 200H350C363.807 200 375 211.193 375 225V275C375 288.807 363.807 300 350 300H300L275 325L250 300H200C186.193 300 175 288.807 175 275V225Z" fill="hsl(var(--primary))" />
            <rect x="200" y="235" width="150" height="8" rx="4" fill="white" fillOpacity="0.5"/>
            <rect x="200" y="255" width="120" height="8" rx="4" fill="white" fillOpacity="0.5"/>
            <rect x="200" y="275" width="140" height="8" rx="4" fill="white" fillOpacity="0.5"/>
        </g>
        {/* Decorative elements */}
        <circle cx="100" cy="150" r="15" fill="hsl(var(--accent))" fillOpacity="0.3"/>
        <circle cx="380" cy="100" r="25" fill="hsl(var(--primary))" fillOpacity="0.1"/>
        <path d="M100 300 L120 280 L140 300 Z" fill="hsl(var(--accent))" fillOpacity="0.2"/>
    </svg>
);


export function FaqSection() {
  return (
    <section id="faq" className="py-20 md:py-32 bg-background overflow-hidden relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-blue-500/5 rounded-full blur-3xl" />
        <div className="container px-4 grid md:grid-cols-2 gap-16 items-center">
            <div className="max-w-md">
                <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4 text-slate-800">Frequently Asked Questions</h2>
                
                <div className="relative mt-8 mb-6">
                    <Input placeholder="Search question here" className="pl-10 h-12 rounded-full bg-white shadow-sm"/>
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"/>
                </div>

                <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
                    {faqData.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`} className="border-b-slate-200/80">
                            <AccordionTrigger className="text-base font-semibold text-slate-700 hover:no-underline py-5 text-left">{faq.question}</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground text-left">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
            <div className="relative hidden md:flex justify-center items-center">
                <FaqIllustration />
            </div>
        </div>
    </section>
  );
}
