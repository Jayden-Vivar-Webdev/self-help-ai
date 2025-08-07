import dbConnect from "@/app/lib/dbConnect";
import WorkoutHistory from "@/app/models/WorkoutHistory";
import { NextRequest, NextResponse } from "next/server";
import { verifyUserUid } from "@/app/lib/helpers/api/verifyUid";
import OpenAI from 'openai';

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(request: NextRequest) {
  try {

    //Extract updated workout from db
    await dbConnect()
    //Verify user based on uid and token
    const uid = await verifyUserUid(request)

    //If the uid is not verified return error.
    if(!uid){
        return NextResponse.json({ error: 'Unauthorized: No valid UID' }, { status: 401 })
    }

    //Get both the new prompt and previous workout to change requests
    const {instructions} = await request.json();

    const prevWorkout = await WorkoutHistory.findOne({userId: uid})

    if (!prevWorkout || !Array.isArray(prevWorkout.weeks) || prevWorkout.weeks.length === 0) {
        return NextResponse.json({ error: "Workout history not found or empty" }, { status: 404 });
    }

    // Get the last week in the weeks array
    const lastIndex = prevWorkout.weeks.length - 1;
    const lastWeek = prevWorkout.weeks[lastIndex];

    console.log(typeof(lastWeek));

    //Pass to ai for new workout
    const prompt = `
        You are a fitness AI that generates structured workout plans in JSON format.

        The user has submitted a request to modify their current workout. Your task is to make **minor personalized changes** to their previous workout based on their new prompt. These changes might include:
        - Adjusting reps, sets, or duration
        - Swapping or adding similar exercises
        - Slightly increasing intensity
        - Modifying a specific day

        ⚠️ Important rules:
        - Keep the **overall structure exactly the same** as the original workout JSON
        - Only return a **valid JSON object** with the workout plan (no explanation, no Markdown, no extra text)
        - Do NOT change field names, nesting, or structure
        - DO NOT add comments or free-form text
        - Ensure the JSON can be directly stored in a database

        Here is the user’s modification prompt:
        "${instructions}"

        Here is the user's previous workout (in JSON):
        ${JSON.stringify(lastWeek)}
    `;

    //Response from ai
    const response = await client.responses.create({
        model: 'gpt-4.1',
        input: prompt,
    });

    //Text response
    const text = response.output_text
    console.log(text)
    
    //Variable to hold data
    let updatedWorkout;
    //Clean data returned from gpt model
    try {
      let cleanText = text.trim();
      // Strip ```json and ``` if present
      if (cleanText.startsWith('```')) {
        cleanText = cleanText.replace(/```json\s*|\s*```/g, '').trim();
      }

      updatedWorkout = JSON.parse(cleanText);

    } catch (e) {
      console.error('Failed to parse AI response:', e);
      return new Response(JSON.stringify({ error: 'Failed to parse AI response' }), { status: 500 });
    }

    // Replace the last week with updated week
    prevWorkout.weeks[lastIndex] = updatedWorkout;

    console.log(`${updatedWorkout}`)
    
    // Save changes to DB
    await prevWorkout.save();
    //If success return response.
    return new Response(
        JSON.stringify({ success: true, prevWorkout}),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
    

  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
