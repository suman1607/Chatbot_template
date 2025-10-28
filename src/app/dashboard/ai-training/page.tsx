
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
import { useUser, useFirestore, useCollection, useDoc, useMemoFirebase } from '@/firebase';
import { collection, doc, addDoc, setDoc, deleteDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { sandboxChat } from '@/ai/flows/sandbox-flow';
import { formatDistanceToNow } from 'date-fns';

type KnowledgeItem = {
    id: string;
    title: string;
    type: "file" | "url" | "faq" | "text";
    status: "pending" | "trained" | "error" | "uploading";
    createdAt: any;
    sizeBytes?: number;
    errorMessage?: string;
    progress?: number;
};

type TrainingRun = {
    id: string;
    status: "queued" | "processing" | "completed" | "failed";
    startedAt: any;
    completedAt?: any;
    initiatedBy: string;
    sources: string[];
    durationMs?: number;
}

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
  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();

  const workspaceId = user?.uid;

  const knowledgeCollectionRef = useMemoFirebase(() => workspaceId ? collection(firestore, 'workspaces', workspaceId, 'knowledge') : null, [firestore, workspaceId]);
  const { data: knowledgeBaseData, isLoading: isLoadingKnowledge } = useCollection<Omit<KnowledgeItem, 'id' | 'progress'>>(knowledgeCollectionRef);

  const trainingRunsCollectionRef = useMemoFirebase(() => workspaceId ? collection(firestore, 'workspaces', workspaceId, 'trainingRuns') : null, [firestore, workspaceId]);
  const { data: trainingHistory, isLoading: isLoadingHistory } = useCollection<Omit<TrainingRun, 'id'>>(trainingRunsCollectionRef);
  
  const aiConfigDocRef = useMemoFirebase(() => workspaceId ? doc(firestore, 'workspaces', workspaceId, 'aiConfig', 'config') : null, [firestore, workspaceId]);
  const { data: aiConfig, isLoading: isLoadingAiConfig } = useDoc(aiConfigDocRef);
  
  const [isTraining, setIsTraining] = useState(false);
  const [currentRun, setCurrentRun] = useState<TrainingRun | null>(null);

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
    if (!workspaceId || !knowledgeCollectionRef) return;
    if (file.size > 25 * 1024 * 1024) { // 25MB limit
        toast({ variant: "destructive", title: "File too large", description: `"${file.name}" exceeds the 25MB size limit.` });
        return;
    }
    // Note: Firebase Storage upload logic would go here.
    // For this implementation, we'll simulate the creation of the Firestore document.
    try {
        await addDoc(knowledgeCollectionRef, {
            type: "file",
            title: file.name,
            sizeBytes: file.size,
            status: "pending",
            createdBy: user?.uid,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        });
        toast({ title: "File added", description: `${file.name} is ready for training.` });
    } catch(e) {
        toast({ variant: 'destructive', title: 'Upload Failed', description: 'Could not add file to knowledge base.' });
    }
  }, [workspaceId, knowledgeCollectionRef, user, toast]);

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
    if (!workspaceId) return;
    try {
        await deleteDoc(doc(firestore, 'workspaces', workspaceId, 'knowledge', id));
        // Note: Logic to delete from Storage would go here.
        toast({ title: "Source removed", description: "The knowledge source has been deleted." });
    } catch (e) {
        toast({ variant: 'destructive', title: 'Deletion Failed', description: 'Could not remove the knowledge source.' });
    }
  };

  const startTraining = async () => {
    if (!workspaceId || !trainingRunsCollectionRef) return;
    
    const sourcesToTrain = knowledgeBaseData?.filter(k => k.status !== 'error').map(k => k.id) || [];
    if (sourcesToTrain.length === 0) {
      toast({ variant: 'destructive', title: 'No sources', description: 'Please add knowledge sources before training.' });
      return;
    }

    setIsTraining(true);
    
    try {
        const newRunRef = await addDoc(trainingRunsCollectionRef, {
            status: "queued",
            sources: sourcesToTrain,
            initiatedBy: user?.uid,
            startedAt: serverTimestamp(),
        });
        
        // Simulate backend training process
        setTimeout(async () => {
            await updateDoc(newRunRef, { status: "processing" });
            setTimeout(async () => {
                await updateDoc(newRunRef, { status: "completed", completedAt: serverTimestamp(), durationMs: 15000 });
                if(aiConfigDocRef) await setDoc(aiConfigDocRef, { lastTrainedAt: serverTimestamp() }, { merge: true });
                sourcesToTrain.forEach(async (id) => {
                    const docRef = doc(firestore, 'workspaces', workspaceId, 'knowledge', id);
                    await updateDoc(docRef, { status: 'trained' });
                });
                toast({ title: "Training Complete!", description: "Your AI has been updated." });
                setIsTraining(false);
            }, 15000);
        }, 2000);

    } catch (error) {
        toast({ variant: 'destructive', title: 'Training Failed', description: 'Could not start the training process.' });
        setIsTraining(false);
    }
  };

  const saveBehavior = async () => {
      if(!aiConfigDocRef) return;
      try {
        await setDoc(aiConfigDocRef, {
            systemPrompt,
            persona: {
                name: personaName,
                tone: personaTone,
            }
        }, { merge: true });
        toast({ title: "Behavior Saved", description: "AI persona and prompt have been updated." });
      } catch (error) {
        toast({ variant: 'destructive', title: 'Save Failed', description: 'Could not save AI behavior.' });
      }
  }

  const handleSandboxSubmit = async () => {
    if (!sandboxInput.trim() || isAiResponding) return;
    const userMessage: ChatMessage = { role: 'user', text: sandboxInput };
    setSandboxMessages(prev => [...prev, userMessage]);
    setSandboxInput('');
    setIsAiResponding(true);

    const trainedKnowledge = knowledgeBaseData
      ?.filter(item => item.status === 'trained' && (item as any).content)
      .map(item => ({ source: item.title, content: (item as any).content! })) || [];
    const history = sandboxMessages.filter(m => m.role === 'user' || m.role === 'model').map(m => ({
        role: m.role as 'user' | 'model', content: [{ text: m.text }]
    }));
    history.push({ role: 'user', content: [{ text: userMessage.text }] });

    try {
        const result = await sandboxChat({ history, knowledge: trainedKnowledge });
        const aiMessage: ChatMessage = { role: 'model', text: result.response };
        setSandboxMessages(prev => [...prev, aiMessage]);
    } catch (error) {
        setSandboxMessages(prev => [...prev, { role: 'model', text: "Sorry, I encountered an error." }]);
    } finally {
        setIsAiResponding(false);
    }
  };
  
  const sortedKnowledgeBase = useMemo(() => {
    return [...(knowledgeBaseData || [])].sort((a, b) => b.createdAt?.toMillis() - a.createdAt?.toMillis());
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
                                {isLoadingKnowledge ? (
                                    <TableRow><TableCell colSpan={5} className="text-center">Loading sources...</TableCell></TableRow>
                                ) : sortedKnowledgeBase.length === 0 ? (
                                     <TableRow><TableCell colSpan={5} className="text-center py-10 text-muted-foreground">No sources yet—upload your first document.</TableCell></TableRow>
                                ) : sortedKnowledgeBase.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium flex items-center gap-2"><FileText className="w-4 h-4 text-muted-foreground"/>{item.title}</TableCell>
                                    <TableCell><Badge variant="outline">{item.type.toUpperCase()}</Badge></TableCell>
                                    <TableCell><StatusBadge status={item.status} /></TableCell>
                                    <TableCell>{item.createdAt ? formatDistanceToNow(item.createdAt.toDate(), { addSuffix: true }) : 'N/A'}</TableCell>
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
                            <Progress value={currentRun?.status === 'processing' ? 50 : 10} className="w-full" />
                            <p className="text-sm text-muted-foreground text-center mt-2">
                                Status: {currentRun?.status || "Queuing..."}
                            </p>
                        </div>
                    )}
                    <Button onClick={startTraining} disabled={isTraining || !knowledgeBaseData?.some(k => k.status === 'pending')} className="w-full">
                        <Sparkles className="w-4 h-4 mr-2" />
                        {isTraining ? 'Training...' : 'Start Training'}
                    </Button>
                     <p className="text-xs text-muted-foreground text-center">
                        Last trained: {aiConfig?.lastTrainedAt ? formatDistanceToNow(aiConfig.lastTrainedAt.toDate(), {addSuffix: true}) : 'Never'}
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
                             {isLoadingHistory ? (
                                <TableRow><TableCell colSpan={4} className="text-center">Loading history...</TableCell></TableRow>
                            ) : trainingHistory?.map(run => (
                                <TableRow key={run.id}>
                                    <TableCell className="font-mono text-xs">{run.id.substring(0, 8)}...</TableCell>
                                    <TableCell><StatusBadge status={run.status as any} /></TableCell>
                                    <TableCell>{run.startedAt ? formatDistanceToNow(run.startedAt.toDate(), {addSuffix: true}) : 'N/A'}</TableCell>
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
