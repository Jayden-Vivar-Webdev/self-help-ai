import { getAuth } from 'firebase/auth';

export async function checkUserProfile() {
    
    try {
      const auth = getAuth()
      const user = auth.currentUser;
      
      if(!user){
        console.error('User not found', Error)
        return null
      }
      
      // Get fresh Firebase ID token
      const idToken = await user.getIdToken();
      

      const response = await fetch('/api/checkUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
          'Authorization' : `Bearer ${idToken}`
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('API error:', errorData.error);
        return null;
      }
  
      const data = await response.json();
      return data; // { exists: boolean, missingFields: string[] }
    } catch (err) {
      console.error('Fetch error:', err);
      return null;
    }
  }
  