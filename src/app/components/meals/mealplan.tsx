import React from 'react';

type MealOption = {
  items: string[];
  completed?: boolean; // optional if sometimes missing
};

type MealsMap = {
  [mealName: string]: MealOption[]; // e.g. breakfast, lunch, dinner, snack1, etc.
};

type DailyMeal = {
  meals: MealsMap; // meals is a map from mealName to MealOption[]
};

type CurrentMealPlan = {
  [day: string]: DailyMeal; // day1, day2, etc.
};

type MealPlan = {
  macroGoals: {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
  };
  mealPreferences: {
    mealsPerDay: number;
    intermittentFasting: string;  // match schema
    allergies: string[];
    dislikes: string[];
  };
  currentMealPlan: CurrentMealPlan;
  feedback: FeedbackEntry[];
};

type FeedbackEntry = {
  meal: string;
  note: string;
  aiResponse: string;
  date: string;
};


interface NutritionalInfoProps {
  mealPlan: MealPlan;
}

export default function NutritionalInfo({ mealPlan }: NutritionalInfoProps) {
  if (!mealPlan) {
    return <p className="p-4 text-gray-400">No meal plan data available.</p>;
  }

  const { macroGoals, mealPreferences, currentMealPlan, feedback } = mealPlan;

  return (
    <section className="max-w-5xl mx-auto p-4 md:p-6 bg-gray-900 rounded-xl text-white shadow-lg border border-gray-700">
  {/* Header */}
  <div className="mb-10 text-center">
    <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
      Nutritional Overview
    </h2>
    <p className="text-gray-400 mt-2">
      Your personalized meal plan and nutritional guidance
    </p>
  </div>

  {/* Macro Goals - Modern cards with better dark theme */}
  <div className="mb-10 grid grid-cols-2 md:grid-cols-4 gap-4">
    {[
      { label: "Calories", value: `${macroGoals.calories} cal`, bg: "from-blue-600/90 to-blue-800/90" },
      { label: "Protein", value: `${macroGoals.protein}g`, bg: "from-purple-600/90 to-purple-800/90" },
      { label: "Carbs", value: `${macroGoals.carbs}g`, bg: "from-pink-600/90 to-pink-800/90" },
      { label: "Fats", value: `${macroGoals.fats}g`, bg: "from-indigo-600/90 to-indigo-800/90" },
    ].map((item, index) => (
      <div 
        key={index}
        className={`bg-gradient-to-br ${item.bg} rounded-xl p-4 text-white shadow-lg border border-gray-700/50 hover:shadow-xl transition-shadow`}
      >
        <p className="text-xs font-medium uppercase tracking-wider opacity-80">{item.label}</p>
        <p className="text-2xl font-bold mt-1.5">{item.value}</p>
      </div>
    ))}
  </div>

  {/* Preferences and Meals */}
  <div className="flex flex-col lg:flex-row gap-6 mb-10">
    {/* Preferences Card */}
    <div className="lg:w-1/3 bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-700">
      <h3 className="text-xl font-semibold mb-5 flex items-center gap-3">
        <span className="w-2 h-6 bg-blue-500 rounded-full"></span>
        <span>Meal Preferences</span>
      </h3>
      <div className="space-y-5">
        {[
          { label: "Meals per day", value: mealPreferences.mealsPerDay },
          { label: "Fasting", value: mealPreferences.intermittentFasting},
          { label: "Allergies", value:
            mealPreferences.allergies.length > 0
              ? mealPreferences.allergies
                  .map(allergy => allergy.charAt(0).toUpperCase() + allergy.slice(1))
                  .join(', ')
              : 'None', },
          { label: "Dislikes", value: mealPreferences.dislikes.length > 0 ? mealPreferences.dislikes.join(', ') : 'None' },
        ].map((item, idx) => (
          <div key={idx}>
            <p className="text-xs uppercase tracking-wider text-gray-400 mb-1">{item.label}</p>
            <p className="font-medium text-gray-100">{item.value}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Meals Card */}
    <div className="lg:w-2/3 bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-700">
      <h3 className="text-xl font-semibold mb-5 flex items-center gap-3">
        <span className="w-2 h-6 bg-purple-500 rounded-full"></span>
        <span>Weekly Meal Plan</span>
      </h3>
      
      <div className="space-y-6">
      {Object.entries(currentMealPlan).map(([day, dailyMeal]) => (
        <div key={day} className="pb-6 last:pb-0">
          <h4 className="font-medium text-gray-300 mb-3 border-b border-gray-700 pb-2">{day}</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.keys(dailyMeal.meals).map(mealType => (
            <div key={mealType} className="bg-gray-700/50 rounded-lg p-4 border border-gray-700">
              <h5 className="font-medium text-xs uppercase tracking-wider text-gray-400 mb-3">
                {mealType}
              </h5>
              {dailyMeal.meals[mealType]?.length ? (
                <ul className="space-y-3">
                  {dailyMeal.meals[mealType].map((option, idx) => (
                    <li key={idx} className="text-sm flex items-start">
                      <span className="inline-block w-2 h-2 rounded-full bg-blue-400 mr-3 mt-2 flex-shrink-0"></span>
                      <div>
                        <span className="font-bold text-gray-200">Option {idx + 1}:</span> 
                        <p className="text-gray-300">{option.items.join(', ')}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm italic text-gray-500">No options planned</p>
              )}
            </div>
          ))}

          </div>
        </div>
      ))}

      </div>
    </div>
  </div>

  {/* Feedback */}
  <div className="bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-700">
    <h3 className="text-xl font-semibold mb-5 flex items-center gap-3">
      <span className="w-2 h-6 bg-pink-500 rounded-full"></span>
      <span>Feedback History</span>
    </h3>
    
    {feedback.length > 0 ? (
      <div className="space-y-5">
        {feedback.map((entry, idx) => (
          <div key={idx} className="border-l-2 border-blue-500 pl-4 py-2">
            <div className="flex justify-between items-start flex-wrap gap-2 mb-2">
              <span className="font-medium text-gray-200 capitalize">{entry.meal}</span>
              <span className="text-xs text-gray-500">
                {new Date(entry.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
            <div className="mb-3">
              <p className="text-sm text-gray-300">{entry.note}</p>
            </div>
            <div className="bg-blue-900/30 rounded p-3 border border-blue-800/50">
              <p className="text-xs font-medium text-blue-400 mb-1">AI RESPONSE</p>
              <p className="text-sm text-gray-200">{entry.aiResponse}</p>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="text-center py-8">
        <p className="text-gray-500">No feedback submitted yet</p>
        <button className="mt-3 px-4 py-2 text-sm bg-gray-700 hover:bg-gray-600 rounded-lg text-blue-400 transition-colors">
          Add your first feedback
        </button>
      </div>
    )}
  </div>
</section>
  );
}