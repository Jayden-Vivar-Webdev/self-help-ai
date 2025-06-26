import { getAuth } from "firebase/auth";

export async function getMealPlan(){

    try{
        const auth = getAuth();
        const user = auth.currentUser;

        if(!user){
            throw new Error('Could not find workout. User not authenticated.') 
        }

        const idToken = await user.getIdToken();

        const res = await fetch('/api/getMealPlan',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${idToken}`
                },
            }
        )
        if (!res.ok) {
            throw new Error('Failed to get workout plan');
        }
        const data = await res.json();  // await here
        return data

    }catch(error){
        console.log(error)
    }
}