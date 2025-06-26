// app/api/workoutPlan/route.ts (or pages/api/workoutPlan.ts)
import dbConnect from '@/app/lib/dbConnect';
import UserMealPlan from '@/app/models/MealPlan';
import { verifyUserUid } from '@/app/lib/helpers/api/verifyUid';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
        //Get authentication from current user from firebase func
        const uid = await verifyUserUid(request)

        await dbConnect();
        const meals = await UserMealPlan.findOne({ userId: uid });

        if (!meals) {
            return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
        }

        return new Response(JSON.stringify(meals), {
            status: 200,
            headers: {
              'Content-Type': 'application/json',
            },
          });
    }
    catch(error){
        return new Response(JSON.stringify({ error: 'Something Went wrong' + error }), { status: 404 });
    }
}
