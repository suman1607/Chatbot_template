
// This file contains mock data for the static UI template.
// In a real application, this data would be fetched from a backend API.

export const mockUser = {
    uid: 'mock-user-123',
    displayName: 'John Doe',
    email: 'john.doe@example.com',
    photoURL: 'https://picsum.photos/seed/johndoe/100/100',
};

// Represents the permissions for the mock user.
// Developers can modify this to test different UI states.
export const mockUserPermissions = [
    'Dashboard', 
    'Conversations', 
    'Analytics', 
    'AI Training', 
    'Team', 
    'Widget', 
    'Settings', 
    'Support'
];

export const mockWorkspace = {
    widgetSettings: {
        name: "My First Widget",
        brandColor: '#F97316',
        welcomeMessage: 'Hello! How can we help you today?',
        showBranding: true,
    },
    whitelistedDomains: [
        'chatgenius.com',
        'localhost:3000'
    ]
};

export const mockKnowledgeBase = [
  { id: "kb-1", title: "Getting Started Guide.pdf", type: "file", status: "trained", createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), sizeBytes: 1200000 },
  { id: "kb-2", title: "Billing FAQs", type: "faq", status: "trained", createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) },
  { id: "kb-3", title: "API Documentation", type: "url", status: "pending", createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000) },
  { id: "kb-4", title: "Integration Guide.docx", type: "file", status: "error", createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), errorMessage: "Failed to parse document." },
] as const;


export const mockTrainingHistory = [
    { id: 'run-123', status: 'completed', sources: ['kb-1', 'kb-2'], startedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), durationMs: 120500 },
    { id: 'run-122', status: 'completed', sources: ['kb-1'], startedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), durationMs: 98000 },
    { id: 'run-121', status: 'failed', sources: ['kb-4'], startedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000), durationMs: 5000, errorMessage: 'Source document timed out.' },
] as const;

export const mockAiConfig = {
    systemPrompt: "You are a helpful and friendly assistant for the company ChatGenius. Your goal is to provide quick and accurate answers. Be concise and professional.",
    persona: {
        name: "GeniusBot",
        tone: "friendly",
        avatarUrl: "/bot-avatar.png",
    },
    lastTrainedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    modelVersion: "gemini-2.5-flash",
};
