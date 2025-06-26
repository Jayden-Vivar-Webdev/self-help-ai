import dbConnect from '@/app/lib/dbConnect';
import User from '@/app/models/User';
import OpenAI from 'openai';
import WorkoutHistory from '@/app/models/WorkoutHistory';
import { verifyUserUid } from '@/app/lib/helpers/api/verifyUid';
import { NextRequest } from 'next/server';

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(request: NextRequest) {
  try {
    
    const uid = await verifyUserUid(request)

    // Find user profile
    const user = await User.findOne({ uid });
    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }

    await dbConnect();

    // Find existing workout history
    const existingHistory = await WorkoutHistory.findOne({ userId: uid });

    // Prepare previous week data for prompt if exists
    let lastWeekJSON = '';
    let nextWeekNumber = 1;

    if (existingHistory && existingHistory.weeks.length > 0) {
      // Get last week
      const lastWeek = existingHistory.weeks[existingHistory.weeks.length - 1];
      lastWeekJSON = JSON.stringify(lastWeek, null, 2);
      nextWeekNumber = lastWeek.week + 1;
    }

    // Construct AI prompt with user info and previous week if available
    const prompt = `
      You are a fitness coach AI. Using the user's profile below, create a new weekly workout plan for week ${nextWeekNumber}, improving or progressing from the previous week workout plan.

      Previous week workout plan:
      ${lastWeekJSON || 'No previous workout plan available.'}

      Based on the previous week's workout plan and any feedback provided (e.g., difficulty, injuries, notes), adjust the next week's workout to promote safe progression. This could include:
        - Increasing weight or reps for exercises where the user showed readiness,
        - Deloading or reducing intensity if the previous week was too difficult or there were injuries,
        - Modifying or substituting exercises to address any feedback or avoid injury,
        - Maintaining variety and balanced workload throughout the week.

        Use your best judgment to help the user improve while preventing overtraining or injury.

      The new workout plan must follow this JSON structure:

      {
        "week": ${nextWeekNumber},
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

      User profile:
      - Age: ${user.age}
      - Height: ${user.height_cm}
      - Weight: ${user.weight_kg}
      - Equipment available: ${user.equipment.length > 0 ? user.equipment.join(', ') : 'none'}
      - Experience level: ${user.experience_level}
      - Fitness goal: ${user.goal}
      - Workouts per week: ${user.workouts_per_week}
      - Injuries: ${user.injuries}
      - Health Conditions: ${user.healthConditions}

      Important:
      - For strength exercises, provide "sets" and "reps" and keep "otherWorkouts": null.
      - For cardio or recovery exercises, do NOT provide "sets" or "reps". Instead, put the description of the cardio or recovery session in the "otherWorkouts" field.
      - In cardio or recovery exercises, set "sets" and "reps" to null.
      - The "weight" and "RPE" fields can be null if not applicable.
      - Make sure the output is valid JSON following the schema above.
    `;

    // Send prompt to OpenAI
    const response = await client.responses.create({
      model: 'gpt-4.1',
      input: prompt,
    });

    let cleanText = response.output_text.trim();

    // Optional: remove markdown ```json blocks if present
    if (cleanText.startsWith('```')) {
      cleanText = cleanText.replace(/```json\s*|\s*```/g, '').trim();
    }

    // ✅ Find and keep just the JSON part
    const firstBrace = cleanText.indexOf('{');
    const lastBrace = cleanText.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1) {
      cleanText = cleanText.slice(firstBrace, lastBrace + 1);
    }

    let workoutPlan;

    try {

      workoutPlan = JSON.parse(cleanText);

    } catch (e) {
      console.error('Failed to parse AI response:', e);
      return new Response(JSON.stringify({ error: 'Failed to parse AI response' }), { status: 500 });
    }

    if (existingHistory) {
      // Add new week to existing weeks
      existingHistory.weeks.push(workoutPlan);
      await existingHistory.save();

      return new Response(JSON.stringify(existingHistory), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      // No existing history - create new workout history doc
      const newWorkout = await WorkoutHistory.create({
        userId: uid,
        weeks: [workoutPlan],
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
