// app/api/workoutPlan/route.ts (or pages/api/workoutPlan.ts)
import dbConnect from '@/app/lib/dbConnect';
import User from '@/app/models/User';
import OpenAI from 'openai';
import UserMealPlan from '@/app/models/MealPlan';
import { verifyUserUid } from '@/app/lib/helpers/api/verifyUid';
import { NextRequest } from 'next/server';

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(request: NextRequest) {
    try{
        //Get authentication from current user from firebase func
        const uid = await verifyUserUid(request)

        await dbConnect();

        const user = await User.findOne({ uid })

        if(!user){
            return new Response(JSON.stringify({error: "User Not Found"}), {status: 404});
        }
        
        const {
            goal,
            healthConditions,
            weight_kg,
            height_cm,
            workouts_per_week,
            mealsPerDay,
            intermittentFasting,
            allergies = [],
        } = user;
        
        const prompt = `
                You are a professional nutritionist AI tasked with generating realistic meal plans based on a user's profile. The meal plan must help the user reach their fitness goal (e.g., fat_loss, muscle_gain), while taking into account allergies, dislikes, and any health conditions.

                ---

                🧑 User Details:
                - Goal: ${goal}
                - Height: ${height_cm} cm
                - Weight: ${weight_kg} kg
                - Workouts per week: ${workouts_per_week}
                - Health Conditions: ${healthConditions?.join(', ') || 'None'}
                - Meals Per Day: ${mealsPerDay},     
                - IntermittentFasting: ${intermittentFasting},
                - Allergies: ${allergies.join(', ') || 'None'}

                ---

                🍴 Meal Plan Requirements:

                1. Estimate the user's required **macroGoals**:
                - calories (kcal)
                - protein (grams)
                - carbs (grams)
                - fats (grams)

                2. Create a **1-day meal plan** with 3 meals:
                - breakfast
                - lunch
                - dinner

                3. For each meal, provide **1–2 different MealOption objects**.
                - The total macros (calories, protein, carbs, fats) from all meals combined must be as close as possible to the user's daily macro goals (within ±5%).
                - Distribute macros approximately as follows:
                - Breakfast: 30–40% of daily calories
                - Lunch: 30–40% of daily calories
                - Dinner: 20–30% of daily calories
                - Each MealOption should contain a list of items with realistic, **quantified ingredients**.
                - Example: "2 eggs", "60g oats", "150g grilled chicken", "100g sweet potato"

                4. Return only the JSON object using the format below, matching the database schema exactly.

                ---

                📦 Output format (JSON):

                {
                "macroGoals": {
                    "calories": 2200,
                    "protein": 160,
                    "carbs": 230,
                    "fats": 70
                },
                "mealPreferences": {
                    "mealsPerDay": ${mealsPerDay},
                    "intermittentFasting": ${intermittentFasting},
                    "allergies": ${allergies},
                    "dislikes": []
                },
                "currentMealPlan": {
                    "day1": {
                    "meals": {
                        "breakfast": [
                        {
                            "items": ["60g oats", "1 banana", "1 tbsp peanut butter"],
                            "completed": false
                        },
                        {
                            "items": ["150g Greek yoghurt", "100g berries", "1 tsp honey"],
                            "completed": false
                        }
                        ],
                        "snack1": [
                        {
                            "items": ["30g almonds", "1 apple"],
                            "completed": false
                        }
                        ],
                        "lunch": [
                        {
                            "items": ["150g grilled chicken", "200g white rice", "side salad"],
                            "completed": false
                        }
                        ],
                        "dinner": [
                        {
                            "items": ["200g salmon", "150g sweet potato", "steamed broccoli"],
                            "completed": false
                        }
                        ]
                    }
                    }
                }
                }
                Do NOT include any commentary or explanation. Only return a valid JSON object.
                `;  
                
        const response = await client.responses.create({
            model: 'gpt-4.1',
            input: prompt,
            });
        
        const text = response.output_text
        const parsedMealPlan = JSON.parse(text);

        console.log(parsedMealPlan);

        const updatedPlan = await UserMealPlan.findOneAndUpdate(
            { userId: uid },        // search query: find by userId
            { 
              userId: uid,          // ensure userId is set (required)
              ...parsedMealPlan,      // spread the new meal plan data (macroGoals, mealPreferences, currentMealPlan, etc)
              createdAt: new Date() // optionally update timestamp
            },
            { 
              upsert: true,         // create if not found
              new: true,            // return the new updated document
              overwrite: true       // completely replace the document content (optional: see note below)
            }
          );
          return new Response(JSON.stringify(updatedPlan), { status: 200 });
       
    }
    catch(error){
        return new Response(JSON.stringify({error: error}), { status: 404 })
    }
}