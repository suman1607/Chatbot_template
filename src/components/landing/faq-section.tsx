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
    <svg width="450" height="350" viewBox="0 0 450 350" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M-4.5 350C-4.5 350 49 313.5 111.5 318.5C174 323.5 220 341.5 288.5 329C357 316.5 393.5 291.5 454.5 304.5V350H-4.5Z" fill="#F8F9FA"/>
        <g filter="url(#filter0_d_123_1)">
            <path d="M228.167 127.333C228.167 124.942 230.108 123 232.5 123H249.5C251.892 123 253.833 124.942 253.833 127.333V140.733L268.092 119.533C269.467 117.75 271.867 117.433 273.65 118.808L284.15 126.808C285.933 128.183 286.25 130.583 284.875 132.367L270.617 153.567L283.017 158.3C285.25 159.25 286.4 161.65 285.45 163.883L279.45 177.083C278.5 179.317 276.1 180.467 273.867 179.517L261.467 174.783L253.833 191.017V206.333C253.833 208.725 251.892 210.667 249.5 210.667H232.5C230.108 210.667 228.167 208.725 228.167 206.333V127.333Z" fill="#FFC107"/>
            <path d="M255.433 138.833L253.833 140.733V191.017L261.467 174.783L273.867 179.517L279.45 163.883C280.4 161.65 279.25 159.25 277.017 158.3L264.617 153.567L278.875 132.367C280.25 130.583 279.933 128.183 278.15 126.808L267.65 118.808C265.867 117.433 263.467 117.75 262.092 119.533L255.433 138.833Z" fill="#FFD54F"/>
        </g>
        <path d="M305.5 245.5L343.5 173.5H367L325 253.5L367 333.5H343.5L305.5 261.5L299.5 268.5V333.5H277.5V173.5H299.5L305.5 245.5Z" fill="#E0E0E0"/>
        <path d="M439 173.5H381V206.5H415C421.083 206.5 426.083 208.75 430 213.25C433.917 217.75 436 223.167 436 229.5C436 235.833 433.917 241.25 430 245.75C426.083 250.25 421.083 252.5 415 252.5H400.5L422 333.5H447L420.5 250C431.5 246.167 439.583 238.917 444.75 230.25C449.917 221.583 452.5 211.5 452.5 200C452.5 190.5 450.083 182.583 445.25 176.25C440.417 169.917 433.5 166.75 424.5 166.75H439V173.5Z" stroke="#E0E0E0" strokeWidth="2"/>
        <path d="M382 284C382 268.583 387.583 256.083 398.75 246.5C410.083 236.75 423.583 231.833 439.25 231.833C454.917 231.833 468.417 236.75 479.75 246.5C491.083 256.083 496.75 268.583 496.75 284C496.75 299.417 491.083 311.917 479.75 321.5C468.417 331.25 454.917 336.167 439.25 336.167C423.583 336.167 410.083 331.25 398.75 321.5C387.583 311.917 382 299.417 382 284ZM404.25 284C404.25 294.5 407.917 303.25 415.25 310.25C422.583 317.083 430.583 320.5 439.25 320.5C447.917 320.5 455.917 317.083 463.25 310.25C470.583 303.25 474.25 294.5 474.25 284C474.25 273.5 470.583 264.75 463.25 257.75C455.917 250.583 447.917 247 439.25 247C430.583 247 422.583 250.583 415.25 257.75C407.917 264.75 404.25 273.5 404.25 284Z" fill="#E0E0E0"/>
        <g filter="url(#filter1_f_123_2)">
            <path d="M280.5 95C282.5 90.3333 287.6 84 294 84C300.4 84 302.5 90.1667 303.5 92C304.5 93.8333 306.6 98.4 312.5 97C318.4 95.6 322 89.3333 323.5 87" stroke="#607D8B" strokeWidth="2" strokeLinecap="round"/>
        </g>
        <g filter="url(#filter2_f_123_3)">
            <ellipse cx="260" cy="57.5" rx="10" ry="2.5" fill="#B0BEC5"/>
        </g>
        <path d="M272.5 75.5C269.667 71.8333 262.9 65.5 255.5 67.5C248.1 69.5 247.167 76.5 247.5 78.5" stroke="#B0BEC5" strokeWidth="2" strokeLinecap="round"/>
        <path d="M275.5 60.5C275.5 54.1667 271.583 47.7 264.5 46C257.417 44.3 251.5 47.1667 249.5 50" stroke="#B0BEC5" strokeWidth="2" strokeLinecap="round"/>

        <g filter="url(#filter3_d_123_4)">
            <path d="M284.148 56.4444C282.99 55.4402 281.258 55.5713 280.254 56.7297L273.49 64.9803C272.486 66.1387 272.617 67.8705 273.775 68.8747L276.107 70.8252C277.265 71.8294 278.997 71.6983 280.001 70.5399L286.766 62.2893C287.77 61.1309 287.639 59.4013 286.481 58.3971L284.148 56.4444Z" fill="#F44336"/>
        </g>
        <circle cx="280" cy="62" r="3" fill="white"/>
        <defs>
            <filter id="filter0_d_123_1" x="224.167" y="118.808" width="65.2832" height="101.858" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="4"/>
                <feGaussianBlur stdDeviation="2"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_123_1"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_123_1" result="shape"/>
            </filter>
            <filter id="filter1_f_123_2" x="279.5" y="83" width="45" height="15" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feGaussianBlur stdDeviation="0.5" result="effect1_foregroundBlur_123_2"/>
            </filter>
            <filter id="filter2_f_123_3" x="249" y="54" width="22" height="7" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feGaussianBlur stdDeviation="0.5" result="effect1_foregroundBlur_123_3"/>
            </filter>
            <filter id="filter3_d_123_4" x="269.215" y="52.3945" width="22.7939" height="23.7119" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="1"/>
                <feGaussianBlur stdDeviation="1.5"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0.956863 0 0 0 0 0.262745 0 0 0 0 0.211765 0 0 0 0.5 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_123_4"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_123_4" result="shape"/>
            </filter>
        </defs>
    </svg>
);


export function FaqSection() {
  return (
    <section id="faq" className="py-20 md:py-32 bg-background overflow-hidden relative">
        <div className="container px-4 grid md:grid-cols-2 gap-12 items-center">
            <div className="max-w-md">
                <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4 text-slate-800">Frequently Asked Questions</h2>
                
                <div className="relative mt-8 mb-6">
                    <Input placeholder="Search question here" className="pl-10 h-12 rounded-full bg-white shadow-sm"/>
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"/>
                </div>

                <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
                    {faqData.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`} className="border-b-slate-200/80">
                            <AccordionTrigger className="text-base font-semibold text-slate-700 hover:no-underline py-5">{faq.question}</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
            <div className="relative hidden md:block">
                <FaqIllustration />
            </div>
        </div>
    </section>
  );
}
