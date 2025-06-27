// src/lib/voiceAgent.ts
import { RealtimeAgent, RealtimeSession, tool } from '@openai/agents-realtime';
import { z } from 'zod';
import { getAuth } from 'firebase/auth';


const updateWorkouts = tool({
  name: 'update_workouts',
  description: 'Update users workout plan based on preferences.',
  parameters: z.object({
    instructions: z.string(),
  }),

  async execute({ instructions }) {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if(!user){
          throw new Error('Could not find workout. User not authenticated.') 
        }

        const idToken = await user.getIdToken();
        
        if(!idToken){
          throw new Error('Could not get workout. No token found for authentication.')
        }

        const res = await fetch('/api/updateWorkouts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${idToken}`
          },
          body: JSON.stringify({ instructions }) 
          
        });
  
        if (!res.ok) throw new Error('Failed to save');
  
        return `Saved ${instructions}`;
      } catch (err) {
        console.error(err);
        return `Failed to save ${instructions}`;
      }
    }
});


const agent = new RealtimeAgent({
    name: 'Success Coach',
    instructions: `
    You will be provided with the user's entire workout plan and profile data. Use this information to:

    1. **Explain** the structure and purpose of each session, exercise, or weekly cycle.
    2. **Answer any fitness-related questions** clearly and concisely, using the user's data when relevant.
    3. **Offer expert guidance** on technique, progression, recovery, and scheduling.
    4. **Motivate** and encourage the user, acknowledging their effort, celebrating wins, and offering realistic, supportive feedback.

    💡 **Tone**: Friendly, professional, and empowering — like a coach who genuinely wants the best for the client.

    💬 **When engaging the user**, follow this format when helpful:
    - **Summary**: “You’ve completed 3 out of 4 planned sessions this week — excellent consistency!”
    - **Insights**: “Your squat volume is improving steadily — great job pushing yourself.”
    - **Tips**: “Try increasing your dumbbell press by 2.5 kg next week.”
    - **Motivation**: “Consistency beats perfection. Keep showing up — you’re doing great.”

    If the user is confused, break things down simply. If they ask about next steps, base your guidance on their current plan. Be proactive and encouraging, like a coach who’s on their side every step of the way.

    **Important**: All programs are for educational purposes. Always advise the user to consult with a healthcare professional before making major changes to their training or health routine.

    If a user asks for **any change** to their workout — such as adjusting days, reps, sets, exercises, or adding new goals — you **must call the update_workouts tool** using the user’s request as the instructions parameter. 
    Always use this tool to ensure their workout gets updated in the database.

    `.trim(),
    voice: 'shimmer',
    tools: [updateWorkouts]
  });


export const session = new RealtimeSession(agent, {
  model: 'gpt-4o-realtime-preview-2025-06-03',
});

