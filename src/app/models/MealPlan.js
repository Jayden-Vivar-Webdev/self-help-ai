import mongoose from 'mongoose';

const MealOptionSchema = new mongoose.Schema({
  items: [String],
  completed: { type: Boolean, default: false },
});


const DailyMealSchema = new mongoose.Schema({
  meals: {
    type: Map,
    of: [MealOptionSchema], // each key is a meal name like "breakfast", "snack", etc.
    required: true,
  },
});

const FeedbackSchema = new mongoose.Schema({
  meal: String,
  note: String,
  aiResponse: String,
  date: { type: Date, default: Date.now },
});

const UserMealPlanSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  macroGoals: {
    calories: Number,
    protein: Number,
    carbs: Number,
    fats: Number,
  },
  mealPreferences: {
    mealsPerDay: Number,
    intermittentFasting: String,
    allergies: [String],
    dislikes: [String],
  },
  currentMealPlan: {
    type: Map, // e.g., { "day1": { meals: Map(...) }, "day2": ... }
    of: DailyMealSchema,
  },
  feedback: [FeedbackSchema],
  createdAt: { type: Date, default: Date.now },
});

const UserMealPlan =
  mongoose.models?.UserMealPlan ||
  mongoose.model('UserMealPlan', UserMealPlanSchema);

export default UserMealPlan;
