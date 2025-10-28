

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Palette,
  Settings,
  Code,
  Plus,
  Trash2,
  Monitor,
  Smartphone,
  Eye,
  Send,
  X,
  Bot
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc, setDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';


const WidgetPreview = ({ settings, isMobile, chatOpen, setChatOpen }: any) => {
    
    return (
        <div className={`relative overflow-hidden rounded-lg border-4 border-gray-800 bg-gray-100 shadow-2xl ${isMobile ? 'w-full max-w-[280px] h-[500px]' : 'w-full h-[500px]'}`}>
             <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/bg/800/600')] bg-cover bg-center opacity-50"></div>
             
             {/* Launcher */}
             <button 
                onClick={() => setChatOpen(true)}
                className={cn("absolute w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-300 hover:scale-110",
                   chatOpen ? 'opacity-0 scale-75' : 'opacity-100 scale-100'
                )}
                style={{ 
                    backgroundColor: settings.brandColor,
                    bottom: '1rem',
                    right: '1rem'
                }}
            >
                <MessageSquare className="w-8 h-8" />
            </button>

             {/* Chat Window */}
             <div className={cn(
                "absolute bg-white rounded-lg shadow-2xl flex flex-col transition-all duration-300 ease-in-out",
                isMobile ? 'inset-0' : 'bottom-4 right-4 w-[320px] h-[calc(100%-6rem)]',
                chatOpen 
                    ? 'opacity-100 transform scale-100 translate-y-0' 
                    : 'opacity-0 transform scale-95 translate-y-4 pointer-events-none'
             )}>
                 <div className="p-4 flex items-center justify-between text-white" style={{ backgroundColor: settings.brandColor, borderTopLeftRadius: '0.5rem', borderTopRightRadius: '0.5rem' }}>
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center">
                            <Bot className="w-6 h-6"/>
                        </div>
                        <div>
                            <p className="font-bold text-lg">ChatGenius</p>
                            <p className="text-sm opacity-80">We'll reply as soon as we can</p>
                        </div>
                     </div>
                     <button onClick={() => setChatOpen(false)}><X className="w-5 h-5"/></button>
                 </div>
                 <div className="flex-grow p-4 space-y-4 overflow-y-auto">
                    <div className="flex items-start gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                            <Bot className="w-5 h-5 text-gray-600"/>
                        </div>
                        <div className="bg-gray-100 p-3 rounded-lg rounded-bl-none max-w-xs">
                            <p className="text-sm">{settings.welcomeMessage}</p>
                        </div>
                    </div>
                 </div>
                 <div className="p-4 border-t">
                     <div className="relative">
                         <Input placeholder="Type your message..." className="pr-10"/>
                         <button className="absolute right-2 top-1/2 -translate-y-1/2" style={{color: settings.brandColor}}>
                             <Send className="w-5 h-5"/>
                         </button>
                     </div>
                 </div>
                 {settings.showBranding && (
                    <div className="py-2 px-4 border-t text-center">
                        <a href="#" className="flex items-center justify-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 transition-colors">
                            <MessageSquare className="w-3.5 h-3.5"/>
                            <span>Powered by <strong>ChatGenius</strong></span>
                        </a>
                    </div>
                 )}
             </div>
        </div>
    )
}

export default function WidgetsPage() {
    const { user } = useUser();
    const firestore = useFirestore();
    const workspaceId = user?.uid; // Assuming user uid is the workspace id

    // Fetch workspace data
    const workspaceRef = useMemoFirebase(() => workspaceId ? doc(firestore, 'workspaces', workspaceId) : null, [firestore, workspaceId]);
    const { data: workspaceData, isLoading } = useDoc(workspaceRef);

    const [settings, setSettings] = useState({
        name: "My First Widget",
        brandColor: '#F97316',
        welcomeMessage: 'Hello! How can we help you today?',
        showBranding: true,
    });
    const [isMobilePreview, setIsMobilePreview] = useState(false);
    const [chatOpen, setChatOpen] = useState(true);
    const [domainInput, setDomainInput] = useState('');
    const [whitelistedDomains, setWhitelistedDomains] = useState<string[]>([]);
    const [installationCode, setInstallationCode] = useState('');
    const { toast } = useToast();

    // Effect to update local state when firestore data loads
    useEffect(() => {
        if (workspaceData) {
            setSettings(s => ({ ...s, ...workspaceData.widgetSettings }));
            setWhitelistedDomains(workspaceData.whitelistedDomains || []);
        }
    }, [workspaceData]);
    
    useEffect(() => {
        const origin = typeof window !== 'undefined' ? window.location.origin : 'https://your-deployed-site.com';
        const installationInstructions = `<!-- ChatGenius Widget -->
<script src="${origin}/widget.js" async defer></script>
<script>
  window.addEventListener('load', () => {
    if (window.ChatGenius) {
      window.ChatGenius.init({
        workspaceId: '${workspaceId}',
        brandColor: '${settings.brandColor}',
        welcomeMessage: '${settings.welcomeMessage}',
        showBranding: ${settings.showBranding}
      });
    }
  });
</script>
<!-- End ChatGenius Widget -->`;
        setInstallationCode(installationInstructions);
    }, [settings, workspaceId]);

    const handleSettingChange = (key: string, value: any) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    }

    const saveSettings = useCallback(async () => {
        if (!workspaceRef) return;
        try {
            await updateDoc(workspaceRef, { widgetSettings: settings });
            toast({ title: 'Success!', description: 'Widget settings have been saved.' });
        } catch (error) {
            toast({ variant: 'destructive', title: 'Error!', description: 'Failed to save settings.' });
        }
    }, [workspaceRef, settings, toast]);

    const addDomain = useCallback(async () => {
        if (domainInput && workspaceRef && !whitelistedDomains.includes(domainInput)) {
            try {
                await updateDoc(workspaceRef, {
                    whitelistedDomains: arrayUnion(domainInput)
                });
                setWhitelistedDomains(prev => [...prev, domainInput]);
                setDomainInput('');
                toast({ title: 'Domain added!' });
            } catch (error) {
                toast({ variant: 'destructive', title: 'Error!', description: 'Failed to add domain.' });
            }
        }
    }, [domainInput, workspaceRef, whitelistedDomains, toast]);
    
    const removeDomain = useCallback(async (domainToRemove: string) => {
        if (workspaceRef) {
             try {
                await updateDoc(workspaceRef, {
                    whitelistedDomains: arrayRemove(domainToRemove)
                });
                setWhitelistedDomains(prev => prev.filter(d => d !== domainToRemove));
                toast({ title: 'Domain removed.' });
            } catch (error) {
                toast({ variant: 'destructive', title: 'Error!', description: 'Failed to remove domain.' });
            }
        }
    }, [workspaceRef, toast]);
    
    const copyToClipboard = () => {
        navigator.clipboard.writeText(installationCode).then(() => {
            toast({
                title: 'Copied to clipboard!',
                description: 'The installation code has been copied.',
            });
        });
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

  return (
    <div className="space-y-8">
        <div>
            <h1 className="text-3xl font-bold">Widget</h1>
            <p className="text-muted-foreground">Configure and install your chat widget.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Left Column: Settings */}
            <div className="space-y-6">
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Palette className="w-6 h-6 text-primary"/>
                            Appearance
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <label className="text-sm font-medium">Widget Name</label>
                            <Input value={settings.name} onChange={(e) => handleSettingChange('name', e.target.value)} />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Brand Color</label>
                            <div className="relative">
                                <Input type="text" value={settings.brandColor} onChange={(e) => handleSettingChange('brandColor', e.target.value)} className="pl-10"/>
                                <input type="color" value={settings.brandColor} onChange={(e) => handleSettingChange('brandColor', e.target.value)} className="absolute left-2 top-1/2 -translate-y-1/2 w-6 h-6 appearance-none bg-transparent border-none cursor-pointer"/>
                            </div>
                        </div>
                         <div>
                            <label className="text-sm font-medium">Welcome Message</label>
                            <Textarea value={settings.welcomeMessage} onChange={(e) => handleSettingChange('welcomeMessage', e.target.value)} />
                        </div>
                         <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Show "Powered by" branding</span>
                            <Switch checked={settings.showBranding} onCheckedChange={(checked) => handleSettingChange('showBranding', checked)} />
                        </div>
                        <Button onClick={saveSettings}>Save Appearance</Button>
                    </CardContent>
                </Card>

                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                           <Code className="w-6 h-6 text-primary"/>
                            Installation & Setup
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Tabs defaultValue="install">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="install">Install Code</TabsTrigger>
                                <TabsTrigger value="domains">Domain Whitelist</TabsTrigger>
                            </TabsList>
                            <TabsContent value="install" className="mt-4">
                               <p className="text-sm text-muted-foreground mb-2">Copy and paste this code before the closing `&lt;/body&gt;` tag on your website.</p>
                               <div className="relative bg-gray-900 text-white p-4 rounded-lg font-mono text-xs">
                                   <pre><code>{installationCode}</code></pre>
                                   <Button size="sm" variant="ghost" className="absolute top-2 right-2 text-white hover:bg-gray-700" onClick={copyToClipboard}>
                                       Copy
                                   </Button>
                               </div>
                            </TabsContent>
                             <TabsContent value="domains" className="mt-4">
                                <p className="text-sm text-muted-foreground mb-2">Add domains where you want the widget to appear.</p>
                                <div className="flex gap-2 mb-4">
                                    <Input placeholder="example.com" value={domainInput} onChange={(e) => setDomainInput(e.target.value)}/>
                                    <Button onClick={addDomain} className="bg-primary hover:bg-primary/90 text-primary-foreground">Add</Button>
                                </div>
                                <div className="space-y-2">
                                    {whitelistedDomains.map(d => (
                                        <div key={d} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                                            <p className="font-medium text-sm">{d}</p>
                                            <div className="flex items-center gap-2">
                                                <Badge variant="outline" className="text-green-600 border-green-200">Active</Badge>
                                                <Button variant="ghost" size="icon" className="w-7 h-7" onClick={() => removeDomain(d)}>
                                                    <Trash2 className="w-4 h-4 text-red-500"/>
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                             </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>

            {/* Right Column: Preview */}
            <div className="sticky top-24">
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Eye className="w-6 h-6 text-primary"/>
                                Live Preview
                            </div>
                            <div className="flex items-center gap-2 rounded-full bg-gray-200 p-1">
                                <Button size="icon" variant={!isMobilePreview ? 'default' : 'ghost'} className="w-8 h-8 rounded-full" onClick={() => setIsMobilePreview(false)}>
                                    <Monitor className="w-4 h-4"/>
                                </Button>
                                <Button size="icon" variant={isMobilePreview ? 'default' : 'ghost'} className="w-8 h-8 rounded-full" onClick={() => setIsMobilePreview(true)}>
                                    <Smartphone className="w-4 h-4"/>
                                </Button>
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center justify-center">
                        <WidgetPreview settings={settings} isMobile={isMobilePreview} chatOpen={chatOpen} setChatOpen={setChatOpen} />
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  );
}

