
'use server';
/**
 * @fileOverview A simple AI flow for the training sandbox.
 *
 * - sandboxChat - A function that handles the chat interaction.
 * - SandboxChatInput - The input type for the sandboxChat function.
 * - SandboxChatOutput - The return type for the sandboxChat function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SandboxChatInputSchema = z.object({
  history: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.array(z.object({
      text: z.string(),
    })),
  })).describe('The conversation history.'),
  knowledge: z.array(z.object({
    source: z.string(),
    content: z.string(),
  })).describe('The knowledge base content.'),
});
export type SandboxChatInput = z.infer<typeof SandboxChatInputSchema>;

const SandboxChatOutputSchema = z.object({
  response: z.string().describe("The AI's response."),
});
export type SandboxChatOutput = z.infer<typeof SandboxChatOutputSchema>;

export async function sandboxChat(input: SandboxChatInput): Promise<SandboxChatOutput> {
  const { history, knowledge } = input;
  const lastUserMessage = history[history.length - 1].content[0].text;
  
  const prompt = `You are a helpful assistant being tested in a sandbox.
  Your knowledge is limited to the following sources:
  ${knowledge.map(k => `- ${k.source}`).join('\n')}

  A user has asked: "${lastUserMessage}"
  
  Based on your knowledge, provide a helpful and concise response. If you cannot answer based on the provided knowledge, say so.`;

  const { output } = await ai.generate({
    prompt,
    history,
  });

  return { response: output?.text() || "I'm sorry, I couldn't generate a response." };
}
