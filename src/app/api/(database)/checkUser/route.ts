// Correct for Next.js App Router API routes
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/app/lib/dbConnect';
import User from '@/app/models/User';
import { verifyUserUid } from '@/app/lib/helpers/api/verifyUid';

/**
 * This API Request check the user for missing fields to prompt the
 * AI chat agent to request those fields before proceeding to
 * create the workouts/nutritional guides.
 * @returns UID and missing fields. 
 */
export async function POST(request: NextRequest) {
  try{
     //Get authentication from current user from firebase func
    const uid = await verifyUserUid(request)

    if(!uid){
      return NextResponse.json({ error: 'Unauthorized: No valid UID' }, { status: 401 })
    }

    //Connect to the database
    await dbConnect();

    //Check database user
    const user = await User.findOne({ uid }).lean();

    //If the user isnt found reutrn false and 404
    if (!user) {
      return NextResponse.json({ exists: false }, { status: 404 });
    }

     //Fields to check prior to creating programs
     const requiredFields = [
      'age', 'height_cm', 'weight_kg', 'goal',
      'experience_level', 'equipment', 'workouts_per_week', 'injuries', 'healthConditions', 'mealsPerDay',
      'intermittentFasting', 'allergies'
    ];

    //Check user, keys are strings or unknown/null
    const userObj = user as Record<string, unknown>;

    //Filter through missing fields and retunr 
    const missingFields = requiredFields.filter(field => {
      const val = userObj[field];
      //check arrays for fields. Return wether they have any values.
      if (Array.isArray(val)) return val.length === 0;
      // Check values
      //E.g if val = 0 true && false => false meaning that the field
      //isnt missing.
      return !val && val !== 0;
    });
      
    
    //Return Missing fields 
    return NextResponse.json({ exists: true, missingFields });

    
  } catch(error){
    return NextResponse.json({ error: (error as Error).message }, { status: 401 });
  }
 
  
  
}
