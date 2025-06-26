import { getAuth } from "firebase/auth";

export async function handleNextWeekGeneration () {
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

      const res = await fetch('/api/nextWeek', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
          'Authorization' : `Bearer ${idToken}`
        },
        
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to generate next week');
      }
  
      const newWeek = await res.json();
      console.log('New week added:', newWeek);
      // Optionally re-fetch full workout or update state here
  
    } catch (err) {
      console.error(err);
    }
  };

