import { z } from 'zod';
import { getAuth } from 'firebase/auth';
import { RealtimeAgent, RealtimeSession, tool } from '@openai/agents-realtime';

const getData = tool({
  name: 'get_data',
  description: 'Return the missing data from the database.',
  parameters: z.object({ 
    missingFields: z.array(z.string())
  }),

  async execute({ missingFields }) {
    // This function won't return data directly, but triggers questions from the agent.
    // So just return an empty string or a message.
    return `I will ask you for the following data: ${missingFields.join(', ')}`;
  },
});

const updateUserProfile = tool({
    name: 'update_user_profile',
    description: 'Save a user profile field to the database.',
    parameters: z.object({
      field: z.string(),
      value: z.string()
    }),
  
    async execute({ field, value }) {
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

          const res = await fetch('/api/updateProfile', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${idToken}`
            },
            body: JSON.stringify({ field, value }) 
            
          });
    
          if (!res.ok) throw new Error('Failed to save');
    
          return `Saved ${field}: ${value}`;
        } catch (err) {
          console.error(err);
          return `Failed to save ${field}`;
        }
      }
  });



const generateWorkout = tool({
  name: 'generate-initial-workout',
  description: 'Generate initial workout and save to database.',
  parameters: z.object({}),

  async execute() {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      throw new Error('User not authenticated');
    }

    const idToken = await user.getIdToken();

    const res = await fetch('/api/generateWorkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',
        'Authorization' : `Bearer ${idToken}`
       },
      
    });
  
    if (!res.ok) {
      throw new Error('Failed to get workout plan');
    }
    const data = await res.json();  // await here 
    return {data: data, completed: true}
  }
})



const adminAgent = new RealtimeAgent({
    name: 'Administration assistant',
    instructions: `
        You are helping complete the user's profile by collecting all missing information.

        When the get_data tool is called, you will receive a list of missing fields.

        For each missing field, ask the user a specific question **one at a time** using these rules:

        - age: Must be a number between 10 and 100.
        - height_cm: Ask "What is your height in centimeters?"
        - weight_kg: Ask "What is your weight in kilograms?"
        - goal: Ask "What is your fitness goal?"
        - experience_level: Ask "What is your experience level? Beginner, intermediate, or advanced?" Accept only those 3 options.
        - equipment: Ask "Do you have gym access or are you doing home workouts?"
        - workouts_per_week: Ask "How many times a week do you plan to train?"
        - Injuries: Ask "Do you currently have any injuries or physical limitations we should consider in your training plan? Please describe briefly."
        - Health Conditions: Ask "Do you have any medical conditions or health concerns that might affect your workouts? If so, please specify."
        
        Now explain to them you will be asking questions to pass on for the nutritional AI Agen: 
        - Meals Per Day: Ask "How many meals per day do you prefer?" Must be a number between 1 and 10.
        - Intermittent Fasting: Ask "Do you follow intermittent fasting? Please explain.
        - Allergies: Ask "Do you have any food allergies? List them. (Save as a string or array of strings). 


        After asking each question, wait for the user's response and **validate it strictly** according to the rules.

        Once a valid response is received, immediately call the update_user_profile tool with the field name, and the provided value.

        **Do not proceed to the next field or any other step until the current field has been successfully updated.**

        After **all** missing fields have been collected and saved, respond with:

        "Thank you for providing all your information! Here's a summary of your profile:
        - Age: [age]
        - Height: [height_cm] cm
        - Weight: [weight_kg] kg
        - Goal: [goal]
        - Experience Level: [experience_level]
        - Equipment: [equipment]
        - Workouts per week: [workouts_per_week]
        - Injuries: [Injuries]
        - Health Conditions: [Health Conditions]
        - Meals Per Day: [Meals Per Day]
        - Intermittent Fasting: [Intermittent Fasting]
        - Allergies: [Alergies]

        Please note that all workout programs provided are for guidance only. We do not accept any responsibility for injuries or issues that may arise from following these programs.

        Once submitted, your information will be passed on to your personalised Fitness AI Coach. This AI Coach will engage with you about your fitness goals, provide motivation, and help explain your workouts in detail.

        To connect, please end this conversation and click 'start talking' to connect with your AI Coach."

        Immediately after this message, call the generate-initial-workout tool with the user's UID to create their personalized workout plan.

        **Do not attempt to generate or discuss workouts until all profile information is collected and confirmed.**

        Strictly follow these instructions and maintain a polite, encouraging tone throughout the conversation.

        `,
    tools: [getData, updateUserProfile, generateWorkout],
  });
  

export const sessionUpdateAgent = new RealtimeSession(adminAgent, {
    model: 'gpt-4o-realtime-preview-2025-06-03',
  });