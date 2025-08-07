import dbConnect from "@/app/lib/dbConnect";
import WorkoutHistory from "@/app/models/WorkoutHistory";


export async function POST(req: Request) {
  try {

    const updatedWorkout = await req.json();
    
    console.log(updatedWorkout);

    if(!updatedWorkout) {
        return new Response(JSON.stringify({error: 'Issue catching workout'}), {status: 404});
    }

    await dbConnect();

    const updatedDoc = await WorkoutHistory.findOneAndUpdate(
      { userId: updatedWorkout.userId },
      updatedWorkout,
      { new: true, runValidators: true }
    );
    
    if (!updatedDoc) {
      return new Response(JSON.stringify({ error: 'Could not find workout' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
    }
    

    return new Response(
      JSON.stringify({ success: true, userId: updatedWorkout.userId }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
    

  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
