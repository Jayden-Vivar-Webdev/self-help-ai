

type HTMLElementOrNull = HTMLElement | null;
import { session } from "../../voiceAgent";
import { sessionUpdateAgent } from "../../updateProfile";
import { checkUserProfile } from "../../userCheck";
import { retrieveWorkout } from "./requestWorkouts";


//TODO: Create function for sessions: move to frontend helper folder - then import
export async function startTalking(
  orb: HTMLElementOrNull,
  status: HTMLElementOrNull,
  setRetrieveableWorkouts: React.Dispatch<React.SetStateAction<boolean>>,
): Promise<void> 
{
    orb?.classList.add('active');
    status!.textContent = 'Connecting...';
    
    try {
      const res = await fetch('/api/openai/session', { method: 'POST' });
      const data = await res.json();
      const userProfile = await checkUserProfile();
      
      const missingFields = userProfile.missingFields

      console.log(missingFields)

      if (data?.clientSecret && missingFields.length == 0) {
        
        await session.connect({
          apiKey: data.clientSecret,
        });
        
        const workouts = await retrieveWorkout(); 
        const stringified = JSON.stringify(workouts, null, 2);
        
        await session.sendMessage(
          `Here is the information: ${userProfile.name} and workouts to talk about: ${stringified}`
        );

        console.log('Connected to session.');
        status!.textContent = 'Connected. Speak now...';

      }
      else if(data?.clientSecret && missingFields.length > 0){
        
        await sessionUpdateAgent.connect({
          apiKey: data.clientSecret,
        });

        await sessionUpdateAgent.sendMessage(
          `Complete profile for user with uid ${userProfile.uid} and missing fields: ${userProfile.missingFields.join(', ')}`
        );

        sessionUpdateAgent.on('agent_tool_end', (event) => {
          const lastItem = event.context.history[event.context.history.length - 1];
        
          // First, check if `name` exists before comparing it
          if (lastItem && 'name' in lastItem && lastItem.name === 'generate_initial_workout') {
              setRetrieveableWorkouts(true);
          }
        });

        console.log('Connected to admin session.');
        status!.textContent = 'Connected. Speak now...';

      }
      else {
        console.error('No client secret returned:', missingFields);
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
        await sessionUpdateAgent.close();
        console.log('Session closed');

        console.log('Disconnected from sessions.');
        status!.textContent = 'Stopped.';
    } catch (err) {
        console.error('Failed to disconnect:', err);
        status!.textContent = 'Error during disconnect.';
    }
    
    
}