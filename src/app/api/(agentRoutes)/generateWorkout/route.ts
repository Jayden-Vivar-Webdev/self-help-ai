// app/api/workoutPlan/route.ts (or pages/api/workoutPlan.ts)
import dbConnect from '@/app/lib/dbConnect';
import User from '@/app/models/User';
import OpenAI from 'openai';
import WorkoutHistory from '@/app/models/WorkoutHistory'
import { NextRequest } from 'next/server';
import { verifyUserUid } from '@/app/lib/helpers/api/verifyUid';

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(request: NextRequest) {
  try {

    //Get authentication from current user from firebase func
    const uid = await verifyUserUid(request)

    await dbConnect();
    const user = await User.findOne({ uid });

    console.log('User information' + user)

    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }

    const prompt = `
      You are a fitness coach AI. Create a weekly workout plan in JSON format matching this structure:

      { 
        "userId": ${uid},
        "week": 1,
        "completedSessions": 0,
        "weekSubmitted": false,
        "feedback": {
          "difficulty": "",
          "injuries": [],
          "notes": ""
        },
        "sessions": [
          {
            "day": "Monday",
            "name": "Workout name",
            "completed": false,
            "exercises": [
              {
                "name": "Exercise name",
                "sets": 3,
                "reps": 10,
                "weight": null,
                "otherWorkouts": null,
                "RPE": null
              }
            ]
          }
        ]
      }

      Generate a personalized workout plan for a user with these profile details:
      - Age: ${user.age}
      - Height: ${user.height_cm}
      - Weight: ${user.weight_kg}
      - Equipment available: ${user.equipment.length > 0 ? user.equipment.join(', ') : 'none'}
      - Experience level: ${user.experience_level}
      - Fitness goal: ${user.goal}
      - Workouts per week: ${user.workouts_per_week}
      - Injuries: ${user.injuries}
      - Health Conditions: ${user.healthConditions}

      Ensure the output is valid JSON and follows the schema above.
      **Important:**
      - For strength exercises, provide "sets" and "reps" and keep "otherWorkouts": null.
      - For cardio or recovery exercises, do NOT provide "sets" or "reps". Instead, put the description of the cardio or recovery session in the "otherWorkouts" field
      example: "otherWorkouts": "Warm-up 5 minutes at light pace, cool down 5 minutes. Workout is 30 minutes total, alternating 2 min sprint / 2 min walk. "
      - In cardio or recovery exercises, set "sets" and "reps" to "null".
      - The "weight" and "RPE" fields can be "null" if not applicable.
      - Make sure the output is valid JSON and follows the schema above.
    `;

    const response = await client.responses.create({
      model: 'gpt-4.1',
      input: prompt,
    });

    const text = response.output_text


    let workoutPlan;

    try {
      let cleanText = text.trim();
      // Strip ```json and ``` if present
      if (cleanText.startsWith('```')) {
        cleanText = cleanText.replace(/```json\s*|\s*```/g, '').trim();
      }

      workoutPlan = JSON.parse(cleanText);
      console.log(workoutPlan)

    } catch (e) {
      console.error('Failed to parse AI response:', e);
      return new Response(JSON.stringify({ error: 'Failed to parse AI response' }), { status: 500 });
    }

    const existingHistory = await WorkoutHistory.findOne({ userId: uid });

    if (existingHistory) {
      const existingWeekIndex = existingHistory.weeks.findIndex((w: { week: number }) => w.week === workoutPlan.week);

      if (existingWeekIndex !== -1) {
        // Overwrite existing week
        existingHistory.weeks[existingWeekIndex] = workoutPlan;
      } else {
        // Add new week
        existingHistory.weeks.push(workoutPlan);
      }

      await existingHistory.save();

      return new Response(JSON.stringify(existingHistory), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      // No existing history – create new one
      const newWorkout = await WorkoutHistory.create({
        ...workoutPlan,
      });

      return new Response(JSON.stringify(newWorkout), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }



  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
