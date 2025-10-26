

'use client';

import React from 'react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Search,
  Send,
  Smile,
  Paperclip,
  MoreVertical,
  Star,
  Settings2,
  Gift,
  Mic,
  Link2,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const conversationsData = [
    { 
        id: 1, 
        name: "Anna Johnson", 
        avatar: "https://picsum.photos/seed/1/40/40", 
        lastMessage: "Hey! How's it going today? I've been...", 
        time: "09:15 AM", 
        unread: 4, 
        active: true,
        messages: [
            { type: "divider", text: "Today 15:08" },
            { sender: "customer", text: "Hi Sunday AI, I want to create an image of \"mountains in the morning with fog.\" Can you help?", time: "15:08", avatar: "https://picsum.photos/seed/1/32/32" },
            { sender: "ai", text: "Of course! Here's the concept I'll use:\n\n- Theme: Mountains in the morning.\n- Details: Fog covering the slopes, an orange-golden sky, and lush green trees.\n- Style: Realistic or semi-illustrative?\n\nDo you have any additional preferences?", time: "15:09", avatar: "https://picsum.photos/seed/ai/32/32" },
            { sender: "customer", text: "Let's go with semi-illustrative. Also, add some small birds in the sky.", time: "15:10", avatar: "https://picsum.photos/seed/1/32/32" },
            { sender: "ai", text: "Got it! I'll create an image with mountains in the morning, fog covering the landscape, an orange sky, and small birds flying in the distance, in a semi-illustrative style.", time: "15:11", avatar: "https://picsum.photos/seed/ai/32/32" },
        ],
    },
    { 
        id: 2, 
        name: "Brian Carter", 
        avatar: "https://picsum.photos/seed/2/40/40", 
        lastMessage: "Can you help me figure this out? I've bee...", 
        time: "09:22 AM", 
        unread: 0,
        messages: [
            { type: "divider", text: "Yesterday 10:30" },
            { sender: "customer", text: "Hey, I have a question about my recent order.", time: "10:30", avatar: "https://picsum.photos/seed/2/32/32" },
        ],
    },
    { 
        id: 3, 
        name: "Clara Smith", 
        avatar: "https://picsum.photos/seed/3/40/40", 
        lastMessage: "OMG, you won't believe what just hap...", 
        time: "09:30 AM", 
        unread: 0,
        messages: [],
    },
    { 
        id: 4, 
        name: "David Brown", 
        avatar: "https://picsum.photos/seed/4/40/40", 
        lastMessage: "Do you have a minute to talk? I've be...", 
        time: "09:45 AM", 
        unread: 1,
        messages: [
            { type: "divider", text: "Today 09:45" },
            { sender: "customer", text: "Do you have a minute to talk? I've been having some trouble with the setup.", time: "09:45", avatar: "https://picsum.photos/seed/4/32/32" },
        ],
    },
    { 
        id: 5, 
        name: "Henry Moore", 
        avatar: "https://picsum.photos/seed/5/40/40", 
        lastMessage: "Just checking in—how's everything...", 
        time: "10:35 AM", 
        unread: 5,
        messages: [],
    },
    { 
        id: 6, 
        name: "Isabella Taylor", 
        avatar: "https://picsum.photos/seed/6/40/40", 
        lastMessage: "Hey! How's it going today? I've been thin...", 
        time: "12:30 PM", 
        unread: 0,
        messages: [],
    },
    { 
        id: 7, 
        name: "Rachel Carter", 
        avatar: "https://picsum.photos/seed/7/40/40", 
        lastMessage: "Can you double-check this for me? I wan...", 
        time: "01:00 PM", 
        unread: 0,
        messages: [],
    },
    { 
        id: 8, 
        name: "Steve Evans", 
        avatar: "https://picsum.photos/seed/8/40/40", 
        lastMessage: "I've been meaning to ask—how's the...", 
        time: "01:15 PM", 
        unread: 8,
        messages: [],
    },
];


const SparkleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 3L9.5 8.5L4 11L9.5 13.5L12 19L14.5 13.5L20 11L14.5 8.5L12 3Z" />
        <path d="M5 3L6 5" />
        <path d="M19 13L20 15" />
        <path d="M3 19L5 20" />
        <path d="M13 19L15 20" />
    </svg>
);


export default function ConversationsPage() {
    const [conversations, setConversations] = React.useState(conversationsData);
    const [selectedConversation, setSelectedConversation] = React.useState(conversationsData[0]);
    const [activeTab, setActiveTab] = React.useState("All messages");
    const [searchQuery, setSearchQuery] = React.useState("");
    const [isSearchVisible, setIsSearchVisible] = React.useState(false);

    const filteredConversations = conversations
      .filter(convo => {
        if (activeTab === 'Unread') {
          return convo.unread > 0;
        }
        return true;
      })
      .filter(convo => 
        convo.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const tabs = ["All messages", "Unread"];

    return (
        <div className="flex flex-row h-[calc(100vh-100px)] bg-white rounded-xl shadow-lg border">
            {/* Left Panel: Conversation List */}
            <div className="w-full md:w-2/5 lg:w-1/3 flex flex-col border-r bg-white rounded-l-xl">
                <div className="p-4 border-b">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold">Messages</h2>
                        <div className="flex items-center gap-2">
                           <div className="relative flex items-center">
                                <Input
                                    placeholder="Search..."
                                    className={`pl-10 transition-all duration-300 ease-in-out ${isSearchVisible ? 'w-48 opacity-100' : 'w-0 opacity-0'}`}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onBlur={() => { if(!searchQuery) setIsSearchVisible(false) }}
                                />
                                <Button variant="ghost" size="icon" onClick={() => setIsSearchVisible(!isSearchVisible)} className="absolute right-0">
                                    <Search className="w-5 h-5 text-gray-500" />
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                        {tabs.map(tab => (
                            <button 
                                key={tab} 
                                onClick={() => setActiveTab(tab)}
                                className={`pb-2 ${activeTab === tab ? 'text-primary font-bold border-b-2 border-primary' : 'hover:text-gray-800'}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="p-4">
                    <Button className="w-full h-12 bg-gradient-to-r from-orange-400 to-yellow-400 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-shadow">
                        <SparkleIcon className="mr-2 h-5 w-5" />
                        Chat smarter with Sunday AI!
                    </Button>
                </div>
                
                <div className="flex-grow overflow-y-auto">
                    {filteredConversations.map(convo => (
                        <div
                            key={convo.id}
                            className={`flex items-center gap-4 p-4 cursor-pointer border-r-4 ${selectedConversation?.id === convo.id ? 'bg-orange-50 border-primary' : 'border-transparent hover:bg-gray-50'}`}
                            onClick={() => setSelectedConversation(convo)}
                        >
                            <Avatar className="w-12 h-12 border">
                                <AvatarImage src={convo.avatar} />
                                <AvatarFallback>{convo.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-grow overflow-hidden">
                                <div className="flex justify-between items-baseline">
                                    <p className="font-semibold truncate text-gray-800">{convo.name}</p>
                                    <p className="text-xs text-gray-400 shrink-0">{convo.time}</p>
                                </div>
                                <div className="flex justify-between items-center mt-1">
                                    <p className="text-sm text-gray-500 truncate">{convo.lastMessage}</p>
                                    {convo.unread > 0 && <div className="rounded-full bg-primary text-white text-xs w-5 h-5 flex items-center justify-center shrink-0">{convo.unread}</div>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Panel: Chat Detail */}
            <div className="flex-grow flex flex-col bg-gray-50 rounded-r-xl">
                {selectedConversation ? (
                    <>
                        {/* Chat Header */}
                        <div className="flex items-center justify-between p-4 border-b bg-white rounded-tr-xl">
                            <div className="flex items-center gap-3">
                                <div>
                                    <p className="font-bold text-lg">{selectedConversation.name}</p>
                                    <p className="text-sm text-gray-500">Active conversation</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                 <Button variant="outline" className="font-bold rounded-lg">
                                    <Star className="w-4 h-4 mr-2 text-yellow-500 fill-current" />
                                    Upgrade
                                 </Button>
                                 <Button variant="ghost" size="icon"><Settings2 className="w-5 h-5 text-gray-500" /></Button>
                                 <Button variant="ghost" size="icon"><Gift className="w-5 h-5 text-gray-500" /></Button>
                            </div>
                        </div>

                        {/* Chat View */}
                        <div className="flex-grow overflow-y-auto p-6 space-y-6">
                            {selectedConversation.messages.map((msg, index) => (
                                <div key={index}>
                                    {msg.type === 'divider' ? (
                                        <div className="text-center text-xs text-gray-400 my-4">{msg.text}</div>
                                    ) : (
                                        <div className={`flex items-start gap-3 ${msg.sender === 'customer' ? 'justify-end' : 'justify-start'}`}>
                                            {msg.sender === 'ai' && (
                                                <Avatar className="w-8 h-8 bg-orange-400 text-white flex items-center justify-center">
                                                    <SparkleIcon className="w-5 h-5"/>
                                                </Avatar>
                                            )}
                                            <div className={`max-w-xl p-4 rounded-2xl ${
                                                msg.sender === 'customer' ? 'bg-white rounded-br-none shadow-sm border' : 
                                                'bg-accent rounded-bl-none shadow-sm'
                                            }`}>
                                                <p className="text-sm text-gray-800 whitespace-pre-wrap">{msg.text}</p>
                                                {msg.sender === 'ai' && (
                                                    <div className="flex items-center gap-2 mt-3 text-gray-400">
                                                        <Button variant="ghost" size="icon" className="h-7 w-7"><ThumbsUp className="w-4 h-4" /></Button>
                                                        <Button variant="ghost" size="icon" className="h-7 w-7"><ThumbsDown className="w-4 h-4" /></Button>
                                                    </div>
                                                )}
                                            </div>
                                             {msg.sender === 'customer' && (
                                                <Link2 className="w-5 h-5 text-gray-400 self-center" />
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Input Bar */}
                        <div className="p-4 border-t bg-white rounded-br-xl">
                            <div className="relative">
                                <Mic className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"/>
                                <Input placeholder="Let's ask Sunday AI..." className="pl-12 pr-12 h-12 rounded-lg bg-gray-100 border-transparent focus:bg-white focus:border-primary" />
                                <Button size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg w-9 h-9 bg-gradient-to-r from-orange-400 to-yellow-400 text-white">
                                    <Send className="w-5 h-5" />
                                </Button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                        <MessageSquare className="w-16 h-16 mb-4" />
                        <h3 className="text-lg font-semibold">Select a message</h3>
                        <p className="max-w-xs">Choose from your existing messages, or start a new one.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

