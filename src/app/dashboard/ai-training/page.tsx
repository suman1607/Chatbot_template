
'use client';

import React, { useState, useCallback, useMemo } from 'react';
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
  Link,
  ClipboardType,
  Sparkles,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  History,
  Save,
  Rocket
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
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

const initialKnowledgeBase = [
  { id: 1, source: "pricing-faq.pdf", type: "PDF", status: "Trained", lastUpdated: "2 days ago", progress: 100 },
  { id: 2, source: "https://my-docs.com/api", type: "URL", status: "Trained", lastUpdated: "1 week ago", progress: 100 },
  { id: 3, source: "Getting Started Guide", type: "Text", status: "Pending", lastUpdated: "3 hours ago", progress: 0 },
];

const activityLogData = [
    { action: "Retrained AI with new data", timestamp: "2 hours ago", icon: <Rocket className="w-4 h-4 text-primary" /> },
    { action: "Uploaded 'pricing-faq.pdf'", timestamp: "1 day ago", icon: <FileUp className="w-4 h-4 text-green-500" /> },
    { action: "Crawled 'docs.example.com'", timestamp: "3 days ago", icon: <Link className="w-4 h-4 text-blue-500" /> },
];

export default function AiTrainingPage() {
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [isTraining, setIsTraining] = useState(false);
  const [knowledgeBaseData, setKnowledgeBaseData] = useState(initialKnowledgeBase);
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const startTraining = () => {
    setIsTraining(true);
    setTrainingProgress(0);
    const interval = setInterval(() => {
      setTrainingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsTraining(false);
          toast({ title: "Training Complete", description: "Your AI has been updated with the new knowledge." });
          
          // Update the status of pending items to "Trained"
          setKnowledgeBaseData(currentData => 
            currentData.map(item => 
              item.status === 'Pending' || item.status === 'Uploading' ? { ...item, status: 'Trained', progress: 100 } : item
            )
          );

          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const handleFileUpload = useCallback((file: File) => {
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
            variant: "destructive",
            title: "File too large",
            description: `"${file.name}" exceeds the 5MB size limit.`,
        });
        return;
    }

    const newFileEntry = {
        id: Date.now(),
        source: file.name,
        type: file.type.split('/')[1]?.toUpperCase() || 'File',
        status: "Uploading" as "Uploading" | "Pending" | "Trained",
        lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        progress: 0
    };

    setKnowledgeBaseData(prev => [newFileEntry, ...prev]);

    // Simulate upload progress
    const uploadInterval = setInterval(() => {
        setKnowledgeBaseData(prev => prev.map(item => {
            if (item.id === newFileEntry.id) {
                const newProgress = item.progress + 20;
                if (newProgress >= 100) {
                    clearInterval(uploadInterval);
                    return { ...item, progress: 100, status: "Pending" as "Pending" };
                }
                return { ...item, progress: newProgress };
            }
            return item;
        }));
    }, 200);
  }, [toast]);

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
        handleFileUpload(files[0]);
    }
  }, [handleFileUpload]);

  const onFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if(files && files.length > 0) {
          handleFileUpload(files[0]);
      }
  }, [handleFileUpload]);

  const removeKnowledgeItem = (id: number) => {
    setKnowledgeBaseData(prev => prev.filter(item => item.id !== id));
    toast({ title: "Source removed", description: "The knowledge source has been deleted." });
  }

  const sortedKnowledgeBase = useMemo(() => {
    return [...knowledgeBaseData].sort((a, b) => b.id - a.id);
  }, [knowledgeBaseData]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2"><Bot className="w-8 h-8 text-primary"/> AI Training</h1>
        <p className="text-muted-foreground">
          Improve your AI by providing it with knowledge, instructions, and a unique personality.
        </p>
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
                            <TabsTrigger value="url"><Link className="w-4 h-4 mr-2"/>Import from URL</TabsTrigger>
                            <TabsTrigger value="text"><ClipboardType className="w-4 h-4 mr-2"/>Paste Text</TabsTrigger>
                        </TabsList>
                        <TabsContent value="upload">
                            <input type="file" ref={fileInputRef} onChange={onFileChange} className="hidden" accept=".pdf,.docx,.txt,.csv" />
                             <div 
                                className={`p-6 border-2 border-dashed rounded-lg text-center flex flex-col items-center justify-center h-40 cursor-pointer transition-colors ${isDragging ? 'bg-orange-50 border-primary' : 'bg-gray-50'}`}
                                onClick={() => fileInputRef.current?.click()}
                                onDragOver={onDragOver}
                                onDragLeave={onDragLeave}
                                onDrop={onDrop}
                            >
                                <UploadCloud className="mx-auto h-10 w-10 text-gray-400 mb-2" />
                                <p className="text-sm text-muted-foreground">
                                  <span className="font-semibold text-primary">Click to upload</span> or drag and drop files
                                </p>
                                <p className="text-xs text-muted-foreground">PDF, DOCX, TXT, CSV (max 5MB)</p>
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
                                {sortedKnowledgeBase.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium flex items-center gap-2"><FileText className="w-4 h-4 text-muted-foreground"/>{item.source}</TableCell>
                                    <TableCell><Badge variant="outline">{item.type}</Badge></TableCell>
                                    <TableCell>
                                        {item.status === 'Uploading' ? (
                                            <div className="flex items-center gap-2">
                                                <Progress value={item.progress} className="w-20 h-1.5"/>
                                                <span className="text-xs text-muted-foreground">{item.progress}%</span>
                                            </div>
                                        ) : (
                                            <Badge variant={item.status === "Trained" ? "default" : "secondary"} className={item.status === "Trained" ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"}>
                                                {item.status}
                                            </Badge>
                                        )}
                                    </TableCell>
                                    <TableCell>{item.lastUpdated}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon" onClick={() => removeKnowledgeItem(item.id)}><Trash2 className="w-4 h-4 text-red-500"/></Button>
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
                        <Textarea placeholder="Define your AI's core behavior. E.g., 'You are a helpful and friendly assistant for a SaaS company...'" className="min-h-[100px]" />
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="font-medium">AI Persona</label>
                             <Select defaultValue="friendly">
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="friendly">Friendly & Helpful</SelectItem>
                                    <SelectItem value="professional">Professional & Formal</SelectItem>
                                    <SelectItem value="witty">Witty & Creative</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <label className="font-medium">Bot Name</label>
                            <Input defaultValue="ChatGenius Bot" />
                        </div>
                    </div>
                     <div className="pt-4 flex justify-end">
                        <Button variant="outline"><Save className="w-4 h-4 mr-2"/>Save Behavior</Button>
                    </div>
                 </CardContent>
            </Card>
        </div>
        
        <div className="lg:col-span-1 space-y-8">
             <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Rocket className="w-6 h-6 text-primary"/> Train your AI</CardTitle>
                    <CardDescription>Train your AI with all the knowledge sources you've provided.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {isTraining && (
                        <div>
                            <Progress value={trainingProgress} className="w-full" />
                            <p className="text-sm text-muted-foreground text-center mt-2">Training in progress... ({trainingProgress}%)</p>
                        </div>
                    )}
                    {!isTraining && trainingProgress === 100 && (
                         <div className="text-sm text-green-600 font-medium text-center">Training complete!</div>
                    )}
                    <Button onClick={startTraining} disabled={isTraining} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                        <Sparkles className="w-4 h-4 mr-2" />
                        {isTraining ? 'Training...' : 'Start Training'}
                    </Button>
                     <p className="text-xs text-muted-foreground text-center">Last trained: 2 hours ago</p>
                </CardContent>
            </Card>
            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle>Test Sandbox</CardTitle>
                </CardHeader>
                 <CardContent>
                  <div className="bg-gray-100 p-4 rounded-lg h-80 flex flex-col">
                    <div className="flex-grow space-y-4 overflow-y-auto pr-2">
                      <div className="flex items-start gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0">
                          <Bot className="w-5 h-5" />
                        </div>
                        <div className="bg-white p-3 rounded-lg rounded-bl-none max-w-xs shadow-sm">
                          <p className="text-sm">Hi there! Ask me anything about our product.</p>
                        </div>
                      </div>
                    </div>
                    <div className="relative mt-4">
                      <Input placeholder="Test your AI..." className="pr-10 bg-white" />
                      <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-primary">
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
            </Card>

            <Card className="shadow-sm">
                <CardHeader><CardTitle className="flex items-center gap-2"><History className="w-5 h-5 text-primary"/> Recent Activity</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    {activityLogData.map((log, index) => (
                        <div key={index} className="flex items-center gap-3">
                            <div className="p-2 bg-gray-100 rounded-full">{log.icon}</div>
                            <div>
                                <p className="text-sm font-medium">{log.action}</p>
                                <p className="text-xs text-muted-foreground">{log.timestamp}</p>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );

    