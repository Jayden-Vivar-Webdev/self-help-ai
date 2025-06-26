import { getAuth } from "firebase/auth";

export async function retrieveWorkout() {

    try{
      const auth = await getAuth();
      const user = auth.currentUser;

      if(!user){
        throw new Error('Could not find workout. User not authenticated.') 
      }

      const idToken = await user.getIdToken();
      
      if(!idToken){
        throw new Error('Could not get workout. No token found for authentication.')
      }

      const res = await fetch('/api/workouts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
         },
      });
    
      if (!res.ok) {
        throw new Error('Failed to get workout plan');
        
      }
      
      const data = await res.json();  // await here
      console.log("retrieveWorkouts called", new Error().stack);
      return data
    }
    catch(error: unknown){
      
      if(error){
        console.error('Workout fetch error:', error);
      }
      throw error; 
    }
    
  }