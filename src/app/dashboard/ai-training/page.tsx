
'use client';

import React, { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ArrowRight, BarChart2, Book, Bot, Check, ChevronDown, ChevronRight, FileText, Globe, HelpCircle, History, Inbox, Info, Plus, Search, Send, Settings, Trash2, UploadCloud, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import Link from 'next/link';

const knowledgeBaseData = [
  { title: "How to reset your password", category: "Account", lastUpdated: "2 days ago", status: "Published" },
  { title: "Understanding your invoice", category: "Billing", lastUpdated: "1 week ago", status: "Published" },
  { title: "Integrating with Shopify", category: "Integrations", lastUpdated: "3 weeks ago", status: "Draft" },
];

const failedQuestionsData = [
    { question: "How do I add a team member on mobile?", frequency: 28 },
    { question: "Can I export my chat history to CSV?", frequency: 15 },
    { question: "What is your refund policy for yearly plans?", frequency: 9 },
];

const activityLogData = [
    { action: "Retrained AI with new data", timestamp: "2 hours ago", icon: <Bot className="w-4 h-4 text-primary" /> },
    { action: "Uploaded 'pricing-faq.pdf'", timestamp: "1 day ago", icon: <FileText className="w-4 h-4 text-green-500" /> },
    { action: "Website crawl completed for 'docs.example.com'", timestamp: "3 days ago", icon: <Globe className="w-4 h-4 text-blue-500" /> },
];

const coverageData = [
    { name: 'Jan', coverage: 65 }, { name: 'Feb', coverage: 68 }, { name: 'Mar', coverage: 72 },
    { name: 'Apr', coverage: 75 }, { name: 'May', coverage: 78 }, { name: 'Jun', coverage: 82 },
];


export default function AiTrainingPage() {
  const [confidence, setConfidence] = useState([75]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">AI Training</h1>
        <p className="text-muted-foreground">
          Continuously improve your AI chatbot by training it with new knowledge, FAQs, and business context.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold">Knowledge Base</CardTitle>
                <CardDescription>
                  Manage the articles and FAQs your AI uses to answer questions.
                </CardDescription>
              </div>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Add New Article
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {knowledgeBaseData.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.title}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>{item.lastUpdated}</TableCell>
                      <TableCell>
                        <Badge
                          variant={item.status === "Published" ? "default" : "secondary"}
                          className={item.status === "Published" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                        >
                          {item.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Website Crawler</CardTitle>
              <CardDescription>
                Automatically import knowledge from your website or help center.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input placeholder="Enter URL (e.g., https://example.com/faq)" />
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Start Crawl
                </Button>
              </div>
              <div className="p-4 border-2 border-dashed rounded-lg text-center">
                <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-muted-foreground">
                  Or <strong>drag and drop</strong> files (PDF, DOCX, TXT) here.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl font-bold">AI Coverage & Improvements</CardTitle>
              <CardDescription>
                Identify and fill gaps in your AI's knowledge.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-2">AI Resolution Rate</h3>
                <div className="relative h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={coverageData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                      <defs>
                        <linearGradient id="coverageGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis fontSize={12} tickLine={false} axisLine={false} domain={[60, 90]} />
                      <Tooltip />
                      <Area type="monotone" dataKey="coverage" stroke="hsl(var(--primary))" fill="url(#coverageGradient)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                  <div className="absolute top-0 right-0 p-2 bg-background/80 rounded-bl-lg">
                    <p className="text-2xl font-bold text-primary">82%</p>
                    <p className="text-xs text-muted-foreground">Current</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Top Unanswered Questions</h3>
                <div className="space-y-2">
                  {failedQuestionsData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded-md bg-gray-50">
                      <p className="text-sm">{item.question}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{item.frequency}</Badge>
                        <Button variant="ghost" size="sm">Add to KB</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl font-bold">AI Settings & Retraining</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label htmlFor="personality" className="text-sm font-medium">
                  AI Personality
                </label>
                <Select defaultValue="friendly">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="friendly">Friendly</SelectItem>
                    <SelectItem value="formal">Formal</SelectItem>
                    <SelectItem value="concise">Concise</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">
                  Confidence Threshold: {confidence[0]}%
                </label>
                <Slider defaultValue={[75]} max={100} step={5} onValueChange={setConfidence} />
              </div>
              <div>
                <label htmlFor="instructions" className="text-sm font-medium">
                  Business Instructions
                </label>
                <Textarea id="instructions" placeholder="e.g., 'Always mention our 14-day free trial...'" className="min-h-[80px]" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Auto-train AI</span>
                <Switch id="auto-train" defaultChecked />
              </div>
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                <Bot className="w-4 h-4 mr-2" />
                Retrain AI Now
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Try Your AI</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-100 p-4 rounded-lg h-64 flex flex-col">
                <div className="flex-grow space-y-3">
                  <div className="flex items-start gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0">
                      <Bot className="w-5 h-5" />
                    </div>
                    <div className="bg-white p-3 rounded-lg rounded-bl-none max-w-xs">
                      <p className="text-sm">
                        Hi there! How can I help you train me today?
                      </p>
                    </div>
                  </div>
                </div>
                <div className="relative mt-4">
                  <Input placeholder="Ask your AI a question..." className="pr-10" />
                  <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Recent Changes</CardTitle>
            </CardHeader>
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

      <div className="mt-8 p-4 bg-accent/50 border-l-4 border-primary rounded-r-lg flex items-center gap-4">
        <Info className="w-8 h-8 text-primary" />
        <div>
          <h4 className="font-bold">Pro Tip</h4>
          <p className="text-sm text-muted-foreground">
            Upload your help docs to answer customer questions instantly! Better training leads to higher customer satisfaction.
          </p>
        </div>
      </div>
    </div>
  );
}
