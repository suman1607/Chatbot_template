
'use client';

import React from 'react';
import {
  BookText,
  FileText,
  GitBranch,
  Shield,
  Plus,
  Search,
  Filter,
  Download,
  MoreHorizontal,
  UploadCloud,
  Eye,
  Edit,
  Trash2,
  Copy,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogDescription,
} from "@/components/ui/dialog";
import { Textarea } from '@/components/ui/textarea';

const articles = [
  { id: 'doc-01', title: "Getting Started with ChatGenius", status: 'Published', category: 'Onboarding', lastUpdated: '2 days ago' },
  { id: 'doc-02', title: "How to Train Your AI Bot", status: 'Published', category: 'AI Training', lastUpdated: '1 week ago' },
  { id: 'doc-03', title: "Integrating with Slack", status: 'Draft', category: 'Integrations', lastUpdated: '3 days ago' },
];

const legalDocs = [
    { id: 'legal-01', title: "Terms of Service", version: 'v3.1', status: 'Live', lastUpdated: '2024-05-20' },
    { id: 'legal-02', title: "Privacy Policy", version: 'v2.5', status: 'Live', lastUpdated: '2024-05-20' },
    { id: 'legal-03', title: "Data Processing Agreement (DPA)", version: 'v1.8', status: 'Archived', lastUpdated: '2023-11-10' },
];

export default function AdminDocsPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2"><FileText className="w-8 h-8 text-primary"/> Docs & Legal</h1>
                    <p className="text-muted-foreground">Manage help articles, API documentation, and legal policies.</p>
                </div>
            </div>

            <Card>
                <CardContent className="p-0">
                    <Tabs defaultValue="knowledge_base">
                        <TabsList className="p-4 border-b w-full justify-start bg-transparent rounded-none">
                            <TabsTrigger value="knowledge_base"><BookText className="mr-2 h-4 w-4"/>Knowledge Base</TabsTrigger>
                            <TabsTrigger value="api_docs"><GitBranch className="mr-2 h-4 w-4"/>API Docs</TabsTrigger>
                            <TabsTrigger value="legal"><Shield className="mr-2 h-4 w-4"/>Legal Documents</TabsTrigger>
                        </TabsList>
                        
                        <div className="p-6">
                            <TabsContent value="knowledge_base">
                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex gap-2 items-center">
                                        <div className="group relative max-w-sm">
                                            <Search className="icon absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-orange-900/60" />
                                            <Input 
                                                placeholder="Search articles..."
                                                className="h-11 w-full pl-10 pr-4 border-2 border-transparent rounded-lg outline-none bg-orange-100/50 text-foreground transition-all duration-300 ease-in-out focus:bg-white focus:border-primary focus:shadow-[0_0_5px_hsl(var(--primary)/0.5)]"
                                            />
                                        </div>
                                        <Button variant="outline"><Filter className="mr-2 h-4 w-4"/>Category</Button>
                                    </div>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button className="bg-primary hover:bg-primary/90 text-white"><Plus className="mr-2 h-4 w-4"/>New Article</Button>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-2xl">
                                            <DialogHeader>
                                                <DialogTitle>Create New Article</DialogTitle>
                                                <DialogDescription>Use the editor below to create a new help article.</DialogDescription>
                                            </DialogHeader>
                                            <div className="space-y-4 py-4">
                                                <Input placeholder="Article Title"/>
                                                <Textarea placeholder="Start writing your article... (Supports Markdown)" className="min-h-[250px]"/>
                                            </div>
                                            <DialogFooter>
                                                <Button variant="outline">Save as Draft</Button>
                                                <Button className="bg-primary hover:bg-primary/90 text-white">Publish</Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Title</TableHead>
                                            <TableHead>Category</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Last Updated</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {articles.map((article) => (
                                        <TableRow key={article.id}>
                                            <TableCell className="font-semibold">{article.title}</TableCell>
                                            <TableCell><Badge variant="outline">{article.category}</Badge></TableCell>
                                            <TableCell>
                                                <Badge variant={article.status === 'Published' ? 'default' : 'secondary'} className={article.status === 'Published' ? 'bg-green-100 text-green-800' : ''}>
                                                    {article.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>{article.lastUpdated}</TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal /></Button></DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem><Edit className="mr-2 h-4 w-4"/>Edit</DropdownMenuItem>
                                                        <DropdownMenuItem><Eye className="mr-2 h-4 w-4"/>Preview</DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem className="text-red-500 hover:!bg-red-50 hover:!text-red-600"><Trash2 className="mr-2 h-4 w-4"/>Delete</DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TabsContent>

                            <TabsContent value="api_docs">
                                <h3 className="font-bold text-lg mb-4">Developer Resources</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>API Reference</CardTitle>
                                            <CardDescription>Explore endpoints and models.</CardDescription>
                                            <Button variant="link" className="p-0 justify-start">Go to API Docs <GitBranch className="ml-2 h-4 w-4"/></Button>
                                        </CardHeader>
                                    </Card>
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>SDKs & Libraries</CardTitle>
                                            <CardDescription>Download our official SDKs.</CardDescription>
                                            <Button variant="link" className="p-0 justify-start">View Libraries <Download className="ml-2 h-4 w-4"/></Button>
                                        </CardHeader>
                                    </Card>
                                </div>
                                <h3 className="font-bold text-lg mt-8 mb-4">Code Sample: Authenticate a Request</h3>
                                <div className="relative bg-gray-900 text-white p-4 rounded-lg font-mono text-xs">
                                     <Button size="sm" variant="ghost" className="absolute top-2 right-2 text-white hover:bg-gray-700">
                                       <Copy className="w-3 h-3 mr-1"/> Copy
                                   </Button>
                                    <pre>
                                        <code>
{`fetch('https://api.chatgenius.com/v1/users', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
})
.then(response => response.json())
.then(data => console.log(data));`}
                                        </code>
                                    </pre>
                                </div>
                             </TabsContent>

                            <TabsContent value="legal">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-bold text-lg">Legal Documents</h3>
                                    <Button variant="outline"><UploadCloud className="mr-2 h-4 w-4"/>Upload New Version</Button>
                                </div>
                                <Table>
                                    <TableHeader><TableRow><TableHead>Document</TableHead><TableHead>Version</TableHead><TableHead>Status</TableHead><TableHead>Last Updated</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
                                    <TableBody>
                                        {legalDocs.map(doc => (
                                        <TableRow key={doc.id}>
                                            <TableCell className="font-semibold">{doc.title}</TableCell>
                                            <TableCell><Badge variant="secondary">{doc.version}</Badge></TableCell>
                                            <TableCell><Badge variant={doc.status === 'Live' ? 'default' : 'outline'} className={doc.status === 'Live' ? 'bg-primary text-primary-foreground' : ''}>{doc.status}</Badge></TableCell>
                                            <TableCell>{doc.lastUpdated}</TableCell>
                                            <TableCell className="text-right"><Button variant="outline" size="sm"><Download className="h-3 w-3 mr-2" /> Download</Button></TableCell>
                                        </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TabsContent>
                        </div>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}

    