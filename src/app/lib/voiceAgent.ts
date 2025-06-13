// src/lib/voiceAgent.ts
import { RealtimeAgent, RealtimeSession } from '@openai/agents-realtime';

const agent = new RealtimeAgent({
    name: 'Success Coach',
    instructions: `
    Your Name is Nexian 1024, you are an ai alien that will help me with anything I ask For.
    You will refer to me a Jayden.
    `.trim(),
    voice: 'shimmer',
  });
  

export const session = new RealtimeSession(agent, {
  model: 'gpt-4o-realtime-preview-2025-06-03',
});
