
'use client';

import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import {
  Book,
  Bot,
  FileText,
  Globe,
  Plus,
  Search,
  Send,
  Trash2,
  UploadCloud,
  Info,
  SlidersHorizontal,
  FileUp,
  Link as LinkIcon,
  ClipboardType,
  Sparkles,
  MessageSquare,
  History,
  Save,
  Rocket,
  MoreHorizontal,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Clock,
  Loader
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
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { formatDistanceToNow } from 'date-fns';
import { mockKnowledgeBase, mockTrainingHistory, mockAiConfig } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

type KnowledgeItem = {
    id: string;
    title: string;
    type: "file" | "url" | "faq" | "text";
    status: "pending" | "trained" | "error" | "uploading";
    createdAt: Date;
    sizeBytes?: number;
    errorMessage?: string;
    progress?: number;
};

type TrainingRun = (typeof mockTrainingHistory)[0];

type ChatMessage = {
    role: 'user' | 'model' | 'system';
    text: string;
};

const StatusBadge = ({ status }: { status: KnowledgeItem['status'] }) => {
    const statusConfig = {
        'trained': { icon: <CheckCircle2 size={14} />, className: 'bg-green-100 text-green-800' },
        'pending': { icon: <Clock size={14} />, className: 'bg-orange-100 text-orange-800' },
        'error': { icon: <XCircle size={14} />, className: 'bg-red-100 text-red-800' },
        'uploading': { icon: <Loader size={14} className="animate-spin" />, className: 'bg-blue-100 text-blue-800' },
    };
    const { icon, className } = statusConfig[status] || statusConfig['pending'];
    return <Badge className={cn('gap-1.5', className)}>{icon} {status}</Badge>;
}

export default function AiTrainingPage() {
  const { toast } = useToast();

  const [knowledgeBaseData, setKnowledgeBaseData] = useState<KnowledgeItem[]>(mockKnowledgeBase);
  const [trainingHistory, setTrainingHistory] = useState(mockTrainingHistory);
  const [aiConfig, setAiConfig] = useState(mockAiConfig);
  
  const [isTraining, setIsTraining] = useState(false);

  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [systemPrompt, setSystemPrompt] = useState("");
  const [personaName, setPersonaName] = useState("");
  const [personaTone, setPersonaTone] = useState("friendly");

  const [sandboxInput, setSandboxInput] = useState('');
  const [isAiResponding, setIsAiResponding] = useState(false);
  const [sandboxMessages, setSandboxMessages] = useState<ChatMessage[]>([
      { role: 'system', text: "Hi there! I'm ready to be tested. Ask me anything based on my knowledge." }
  ]);

  useEffect(() => {
    if(aiConfig) {
        setSystemPrompt(aiConfig.systemPrompt || "");
        setPersonaName(aiConfig.persona?.name || "ChatGenius Bot");
        setPersonaTone(aiConfig.persona?.tone || "friendly");
    }
  }, [aiConfig]);

  const handleFileUpload = useCallback(async (file: File) => {
    if (file.size > 25 * 1024 * 1024) { // 25MB limit
        toast({ variant: "destructive", title: "File too large", description: `"${file.name}" exceeds the 25MB size limit.` });
        return;
    }
    // TODO: Add your API call here to upload the file.
    // The response should include the new knowledge item.
    const newKnowledgeItem: KnowledgeItem = {
      id: `file-${Date.now()}`,
      type: "file",
      title: file.name,
      sizeBytes: file.size,
      status: "pending",
      createdAt: new Date(),
    };
    setKnowledgeBaseData(prev => [newKnowledgeItem, ...prev]);
    toast({ title: "File added", description: `${file.name} is ready for training.` });
  }, [toast]);

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
        Array.from(files).forEach(handleFileUpload);
    }
  }, [handleFileUpload]);
  
  const onFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
        Array.from(files).forEach(handleFileUpload);
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, [handleFileUpload]);

  const removeKnowledgeItem = async (id: string) => {
    // TODO: Add your API call here to delete the knowledge source.
    console.log("Removing knowledge item:", id);
    setKnowledgeBaseData(prev => prev.filter(item => item.id !== id));
    toast({ title: "Source removed", description: "The knowledge source has been deleted." });
  };

  const startTraining = async () => {
    const sourcesToTrain = knowledgeBaseData?.filter(k => k.status !== 'error').map(k => k.id) || [];
    if (sourcesToTrain.length === 0) {
      toast({ variant: 'destructive', title: 'No sources', description: 'Please add knowledge sources before training.' });
      return;
    }

    setIsTraining(true);
    
    // TODO: Add your API call to start the training process.
    console.log("Starting training with sources:", sourcesToTrain);

    // Simulate backend training process
    setTimeout(() => {
        setKnowledgeBaseData(prev => prev.map(item => ({ ...item, status: 'trained' })));
        setAiConfig(prev => ({ ...prev, lastTrainedAt: new Date() }));
        toast({ title: "Training Complete!", description: "Your AI has been updated." });
        setIsTraining(false);
    }, 10000);
  };

  const saveBehavior = async () => {
      // TODO: Add your API call to save the AI behavior.
      console.log("Saving behavior:", { systemPrompt, persona: { name: personaName, tone: personaTone } });
      setAiConfig(prev => ({ ...prev, systemPrompt, persona: { name: personaName, tone: personaTone } }));
      toast({ title: "Behavior Saved", description: "AI persona and prompt have been updated." });
  }

  const handleSandboxSubmit = async () => {
    if (!sandboxInput.trim() || isAiResponding) return;
    const userMessage: ChatMessage = { role: 'user', text: sandboxInput };
    setSandboxMessages(prev => [...prev, userMessage]);
    setSandboxInput('');
    setIsAiResponding(true);

    // TODO: Replace this with your actual Genkit or AI SDK call.
    console.log("Submitting to sandbox:", {
      history: sandboxMessages,
      knowledge: knowledgeBaseData.filter(k => k.status === 'trained'),
      input: sandboxInput,
    });
    
    // Simulate AI response
    setTimeout(() => {
      const aiMessage: ChatMessage = { role: 'model', text: "This is a simulated response based on the knowledge you provided. In a real app, I would use a generative AI model to answer." };
      setSandboxMessages(prev => [...prev, aiMessage]);
      setIsAiResponding(false);
    }, 1500);
  };
  
  const sortedKnowledgeBase = useMemo(() => {
    return [...knowledgeBaseData].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }, [knowledgeBaseData]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2"><Bot className="w-8 h-8 text-primary"/> AI Training</h1>
        <p className="text-muted-foreground">Improve your AI by providing it with knowledge, instructions, and a unique personality.</p>
      </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-8">
            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Book className="w-6 h-6 text-primary"/> Knowledge Sources</CardTitle>
                    <CardDescription>Add, remove, and update the data your AI uses to answer questions.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="upload">
                        <TabsList className="grid w-full grid-cols-3 mb-4">
                            <TabsTrigger value="upload"><FileUp className="w-4 h-4 mr-2"/>Upload Files</TabsTrigger>
                            <TabsTrigger value="url"><LinkIcon className="w-4 h-4 mr-2"/>Import from URL</TabsTrigger>
                            <TabsTrigger value="text"><ClipboardType className="w-4 h-4 mr-2"/>Paste Text</TabsTrigger>
                        </TabsList>
                        <TabsContent value="upload">
                            <input type="file" ref={fileInputRef} onChange={onFileChange} className="hidden" accept=".pdf,.docx,.txt,.csv" multiple />
                             <div 
                                className={`p-6 border-2 border-dashed rounded-lg text-center flex flex-col items-center justify-center h-40 cursor-pointer transition-colors ${isDragging ? 'bg-orange-50 border-primary' : 'bg-gray-50'}`}
                                onClick={() => fileInputRef.current?.click()}
                                onDragOver={(e) => {e.preventDefault(); setIsDragging(true);}}
                                onDragLeave={(e) => {e.preventDefault(); setIsDragging(false);}}
                                onDrop={onDrop}
                            >
                                <UploadCloud className="mx-auto h-10 w-10 text-gray-400 mb-2" />
                                <p className="text-sm text-muted-foreground">
                                  <span className="font-semibold text-primary">Click to upload</span> or drag and drop files
                                </p>
                                <p className="text-xs text-muted-foreground">PDF, DOCX, TXT, CSV (max 25MB)</p>
                            </div>
                        </TabsContent>
                        <TabsContent value="url">
                            <div className="flex gap-2">
                                <Input placeholder="Enter a URL to crawl..." />
                                <Button>Fetch Data</Button>
                            </div>
                        </TabsContent>
                        <TabsContent value="text">
                           <Textarea placeholder="Paste your text content here..." className="min-h-[160px]"/>
                           <Button className="mt-2">Add Text</Button>
                        </TabsContent>
                    </Tabs>
                    
                    <Separator className="my-6"/>

                    <div className="space-y-4">
                         <div className="flex justify-between items-center">
                            <h3 className="font-semibold">My Knowledge</h3>
                             <div className="relative w-full max-w-xs">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input placeholder="Search sources..." className="pl-10" />
                            </div>
                        </div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Source</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Last Updated</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {sortedKnowledgeBase.length === 0 ? (
                                     <TableRow><TableCell colSpan={5} className="text-center py-10 text-muted-foreground">No sources yet—upload your first document.</TableCell></TableRow>
                                ) : sortedKnowledgeBase.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium flex items-center gap-2"><FileText className="w-4 h-4 text-muted-foreground"/>{item.title}</TableCell>
                                    <TableCell><Badge variant="outline">{item.type.toUpperCase()}</Badge></TableCell>
                                    <TableCell><StatusBadge status={item.status} /></TableCell>
                                    <TableCell>{formatDistanceToNow(item.createdAt, { addSuffix: true })}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon" onClick={() => removeKnowledgeItem(item.id)}>
                                            <Trash2 className="w-4 h-4 text-red-500"/>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><SlidersHorizontal className="w-6 h-6 text-primary"/> AI Behavior</CardTitle>
                    <CardDescription>Customize your AI's personality and response instructions.</CardDescription>
                </CardHeader>
                 <CardContent className="space-y-6">
                     <div className="space-y-2">
                        <label className="font-medium">System Prompt</label>
                        <Textarea 
                            value={systemPrompt}
                            onChange={(e) => setSystemPrompt(e.target.value)}
                            placeholder="Define your AI's core behavior. E.g., 'You are a helpful and friendly assistant...'" 
                            className="min-h-[100px]" 
                        />
                         {/* TODO: Add your API call here to save the system prompt */}
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="font-medium">AI Persona</label>
                             <Select value={personaTone} onValueChange={setPersonaTone}>
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="friendly">Friendly & Helpful</SelectItem>
                                    <SelectItem value="professional">Professional & Formal</SelectItem>
                                    <SelectItem value="expert">Expert & Authoritative</SelectItem>
                                    <SelectItem value="witty">Witty & Creative</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <label className="font-medium">Bot Name</label>
                            <Input value={personaName} onChange={(e) => setPersonaName(e.target.value)} />
                        </div>
                    </div>
                     <div className="pt-4 flex justify-end">
                        <Button onClick={saveBehavior}><Save className="w-4 h-4 mr-2"/>Save Behavior</Button>
                    </div>
                 </CardContent>
            </Card>
        </div>
        
        <div className="space-y-8">
             <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Rocket className="w-6 h-6 text-primary"/> Train your AI</CardTitle>
                    <CardDescription>Train your AI with all pending knowledge sources.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {isTraining && (
                        <div>
                            <Progress value={50} className="w-full" />
                            <p className="text-sm text-muted-foreground text-center mt-2">
                                Status: Processing...
                            </p>
                        </div>
                    )}
                    <Button onClick={startTraining} disabled={isTraining || !knowledgeBaseData?.some(k => k.status === 'pending')} className="w-full">
                        <Sparkles className="w-4 h-4 mr-2" />
                        {isTraining ? 'Training...' : 'Start Training'}
                    </Button>
                     <p className="text-xs text-muted-foreground text-center">
                        Last trained: {formatDistanceToNow(aiConfig.lastTrainedAt, {addSuffix: true})}
                    </p>
                </CardContent>
            </Card>
            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle>Test Sandbox</CardTitle>
                </CardHeader>
                 <CardContent>
                  <div className="bg-gray-100 p-4 rounded-lg h-80 flex flex-col">
                    <div className="flex-grow space-y-4 overflow-y-auto pr-2">
                      {sandboxMessages.map((msg, index) => (
                          <div key={index} className={`flex items-start gap-2.5 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                            {msg.role !== 'user' && (
                                <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0">
                                <Bot className="w-5 h-5" />
                                </div>
                            )}
                            <div className={`p-3 rounded-lg max-w-xs shadow-sm ${msg.role === 'user' ? 'bg-white rounded-br-none' : 'bg-white rounded-bl-none'}`}>
                                <p className="text-sm">{msg.text}</p>
                            </div>
                         </div>
                      ))}
                      {isAiResponding && (
                        <div className="flex items-start gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0"><Bot className="w-5 h-5" /></div>
                            <div className="bg-white p-3 rounded-lg rounded-bl-none max-w-xs shadow-sm"><p className="text-sm text-muted-foreground animate-pulse">Typing...</p></div>
                        </div>
                      )}
                    </div>
                    <form onSubmit={(e) => { e.preventDefault(); handleSandboxSubmit(); }} className="relative mt-4">
                      <Input placeholder="Test your AI..." className="pr-10 bg-white" value={sandboxInput} onChange={(e) => setSandboxInput(e.target.value)} disabled={isAiResponding}/>
                      <Button type="submit" variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-primary" disabled={isAiResponding}><Send className="w-4 h-4" /></Button>
                    </form>
                  </div>
                </CardContent>
            </Card>

            <Card className="shadow-sm">
                <CardHeader><CardTitle className="flex items-center gap-2"><History className="w-5 h-5 text-primary"/> Training History</CardTitle></CardHeader>
                <CardContent>
                   <Table>
                        <TableHeader><TableRow><TableHead>Run ID</TableHead><TableHead>Status</TableHead><TableHead>Started</TableHead><TableHead>Duration</TableHead></TableRow></TableHeader>
                        <TableBody>
                            {trainingHistory?.map(run => (
                                <TableRow key={run.id}>
                                    <TableCell className="font-mono text-xs">{run.id.substring(0, 8)}...</TableCell>
                                    <TableCell><StatusBadge status={run.status as any} /></TableCell>
                                    <TableCell>{formatDistanceToNow(run.startedAt, {addSuffix: true})}</TableCell>
                                    <TableCell>{run.durationMs ? `${(run.durationMs / 1000).toFixed(1)}s` : '...'}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                   </Table>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
