import { getAuth } from "firebase/auth";

export async function retrieveHistory(selectedMonth: number, selectedYear: number) {

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

      const response = await fetch('/api/view-history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
            'Authorization': `Bearer ${idToken}`
           },
        body: JSON.stringify({
          month: selectedMonth,
          year: selectedYear,
        }),
      });
    
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch workout history');
      }
      
      const data = await response.json();

      console.log(data)
      return data
    }
    catch(error: unknown){
      
      if(error){
        console.error('Workout fetch error:', error);
      }
      throw error; 
    }
    
  }