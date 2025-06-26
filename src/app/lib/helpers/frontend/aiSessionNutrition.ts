

type HTMLElementOrNull = HTMLElement | null;
import { session } from "../../voiceAgent";
import { sessionNutrition } from "../../updateNutrion";
import { UserMealPlan } from "../../types/mealplans/mealplans";


//TODO: Create function for sessions: move to frontend helper folder - then import
export async function startTalking(
  orb: HTMLElementOrNull,
  status: HTMLElementOrNull,
  mealPlan:  UserMealPlan | null,
): Promise<void> 
{
    orb?.classList.add('active');
    status!.textContent = 'Connecting...';
    
    try {
        const res = await fetch('/api/openai/session', { method: 'POST' });
        const data = await res.json();

        if (data?.clientSecret) {
          
          await sessionNutrition.connect({
            apiKey: data.clientSecret,
          });
          
          await sessionNutrition.sendMessage(
            
            `Here is the nutitional meal plan: ${JSON.stringify(mealPlan)}`
          );

          console.log('Connected to session.');
          status!.textContent = 'Connected. Speak now...';
          

        }
        else {
          status!.textContent = 'Failed to retrieve session key.';
        }
      } catch (err) {
        console.error('Connection failed:', err);
        status!.textContent = 'Failed to connect.';
      }
}

export async function stopTalking(
    orb: HTMLElementOrNull,
    status: HTMLElementOrNull,

  ): Promise<void> {
    
    orb?.classList.remove('active');
    status!.textContent = 'Disconnecting...';

    try {
        await session.close();
        await sessionNutrition.close();
        console.log('Session closed');

        console.log('Disconnected from sessions.');
        status!.textContent = 'Stopped.';
    } catch (err) {
        console.error('Failed to disconnect:', err);
        status!.textContent = 'Error during disconnect.';
    }
    
    
}