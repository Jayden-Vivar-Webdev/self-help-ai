export interface MealOption {
    items: string[];
    completed?: boolean; // defaults to false, so optional here
}

export interface DailyMeal {
    meals: Map<string, MealOption[]>; // e.g. "breakfast", "snack" => array of MealOption
}

export interface Feedback {
    meal: string;
    note: string;
    aiResponse: string;
    date: Date;
}

export interface MacroGoals {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
}

export interface MealPreferences {
    mealsPerDay: number;
    intermittentFasting: string;
    allergies: string[];
dislikes: string[];
}

export interface UserMealPlan {
    userId: string;
    macroGoals: MacroGoals;
    mealPreferences: MealPreferences;
    currentMealPlan: Map<string, DailyMeal>; // e.g. "day1", "day2"
    feedback: Feedback[];
    createdAt: Date;
}
  