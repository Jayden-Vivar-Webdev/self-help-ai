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
        
        //return the active week, on the front end if active week is more 2 start displaying previous weeks.  
        const user = await User.findOne({ uid });
        
        if (!user) {
            return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
        }


        // Parse request body for month and year
        const { month, year } = await request.json();

        // Validate input
        if (
            typeof month !== 'number' || month < 1 || month > 12 ||
            typeof year !== 'number' || year < 2000 || year > 2100
        ) {
            return new Response(JSON.stringify({ error: 'Invalid month or year' }), { status: 400 });
        }

        const startDate = new Date(year, month - 1, 1); // e.g. March 2025 => new Date(2025, 2, 1)
        const endDate = new Date(year, month, 1); 

        // Fetch workouts within the month
        const workouts = await WorkoutHistory.find({
            userId: user.uid,
            createdAt: { $gte: startDate, $lt: endDate }
        }).sort({ createdAt: -1 }).exec();
    
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