import dbConnect from '@/app/lib/dbConnect';
import WorkoutHistory from '@/app/models/WorkoutHistory';
import User from '@/app/models/User';
import { verifyUserUid } from '@/app/lib/helpers/api/verifyUid';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {

    try{
         //Get authentication from current user from firebase func
        const uid = await verifyUserUid(request)

        if(!uid){
            return NextResponse.json({ error: 'Unauthorized: No valid UID' }, { status: 401 })
        }

        await dbConnect()
        
        const user = await User.findOne({ uid });
        
        if (!user) {
            return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
        }

        const workouts = await WorkoutHistory.findOne({ userId: user.uid });
        return new Response(JSON.stringify(workouts), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    }
    catch(error){
        console.error('error', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch workout history' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}