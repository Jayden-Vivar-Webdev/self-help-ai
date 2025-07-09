'use client';

import { useState } from 'react';
import { FiCheck, FiEdit2, FiSave, FiLoader, FiAlertCircle } from 'react-icons/fi';
import { handleNextWeekGeneration } from '@/app/lib/helpers/frontend/nextWeekWorkout';
import { WorkoutHistory } from '@/app/lib/types/workouts/workoutHistory';

  

export default function WorkoutPlanDisplay({ workoutData }: { workoutData: WorkoutHistory; }) {
  //variables
  const [workout, setWorkout] = useState<WorkoutHistory>(workoutData);
  const [difficultyInput, setDifficultyInput] = useState('');
  const [injuriesInput, setInjuriesInput] = useState('');
  const [notesInput, setNotesInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  //Set active week to week 1 potentially change in the future.
  const [activeWeek, setActiveWeek] = useState(0);
  

  const [editingWeight, setEditingWeight] = useState<{
    weekIdx: number;
    sessionIdx: number;
    exerciseIdx: number;
    tempWeight: string;
  } | null>(null);


  const handleMarkSessionComplete = (weekIdx: number, sessionIdx: number) => {
    setWorkout(prev => {
      if (!prev) return prev;
  
      // Clone the workout object deeply enough to avoid mutating state directly
      const updated = { ...prev };
      const week = updated.weeks[weekIdx];
      const session = week.sessions[sessionIdx];
  
      // If already completed, do nothing (or optionally toggle)
      if (session.completed) return prev;
  
      // Mark the session completed
      session.completed = true;
  
      // Increment completedSessions count
      week.completedSessions = (week.completedSessions || 0) + 1;
      saveUpdates();
      return updated;
    });
  
    // Optionally save updates right away
  };
  

  const handleWeightChange = (weekIdx: number, sessionIdx: number, exerciseIdx: number, newWeightStr: string) => {
    // Parse float or null if empty
    const newWeight = newWeightStr === '' ? null : parseFloat(newWeightStr);
  
    setWorkout((prev) => {
      if (!prev) return prev;
  
      const updated = { ...prev };
      updated.weeks[weekIdx].sessions[sessionIdx].exercises[exerciseIdx].weight = newWeight;
      saveUpdates();
      return updated;
    });
    
  };

  const handleInsightChange = async (weekIdx: number, difficultyStr: string, injuriesStr: string, notesStr: string) => {
    
    setWorkout((prev) => {
      if(!prev) return prev;
      const update = {...prev};
      update.weeks[weekIdx].feedback.difficulty = difficultyStr;
      update.weeks[weekIdx].feedback.injuries.push(injuriesStr);
      update.weeks[weekIdx].feedback.notes += notesStr;
      update.weeks[weekIdx].weekSubmitted = true;
      console.log('Updated feedback Check', update);
      return update;
    })
      // Wait one tick to allow state to update before saving
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Side effects after state update
    await saveUpdates();
    await handleNextWeekGeneration();
  }
  
  const saveUpdates = async () => {
    try {
      setSaving(true);
      setError(null);

      const res = await fetch('/api/workoutUpdate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(workout),
      });

      console.log('Response status:', res.status);
      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        console.error('Error response from server:', errorData);
        throw new Error(errorData?.error || 'Failed to save updates');
      }
      
      
    } catch (err) {
      console.error(err);
      setError('Error saving workout. Please try again.');
    } finally {
      setSaving(false);
    }
  };



  if (!workout) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] p-6 text-center">
        <FiAlertCircle className="text-3xl text-red-500 mb-3" />
        <h2 className="text-xl font-semibold mb-2">No Workout Data Available</h2>
        <p className="text-gray-600 max-w-md">
          We couldnt find any workout plans for your account. Please check back later or contact support.
        </p>
      </div>
    );
  }

  const isWeekComplete = activeWeek !== null && workout?.weeks[activeWeek]?.completedSessions === workout.weeks[activeWeek]?.sessions.length;
  const weekSubmitted = activeWeek !== null && workout?.weeks[activeWeek]?.weekSubmitted === true;

  return (
    <div className="p-2 pt-[5rem] max-w-1xl mx-auto">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Workout Plan</h1>
            <strong className="text-gray-300">Track and update your weekly training</strong>
          
          
        </div>
        
        {/* Add any additional header elements here */}
    </div>

      {error && (
        <div className="bg-red-900/30 border-l-4 border-red-500 p-4 mb-6 rounded-lg">
          <div className="flex items-center">
            <FiAlertCircle className="text-red-400 mr-3 flex-shrink-0" />
            <p className="text-red-100">{error}</p>
          </div>
        </div>
      )}

      <div className="flex mb-6 overflow-x-auto pb-3 -mx-1 px-1">
        <div className="flex space-x-2">
          {workout.weeks.map((week, idx) => (
            <button
              key={week.week}
              onClick={() => setActiveWeek(idx)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 whitespace-nowrap ${
                activeWeek === idx 
                  ? 'primary-bg text-white shadow-md shadow-blue-500/20 border border-blue-400/30' 
                  : 'bg-gray-700 hover:bg-gray-600 text-gray-200 border border-gray-600'
              }`}
            >
              Week {week.week}
            </button>
          ))}
        </div>
      </div>

      {activeWeek !== null && (
        <div className="">
          <div className="">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">
                Week {activeWeek + 1}
              </h2>
              <div className="flex items-center">
                <span className="text-lg font-bold text-white mr-2">Completion:</span>
                <span className="font-semibold text-white">
                  {workout.weeks[activeWeek].completedSessions}/
                  {workout.weeks[activeWeek].sessions.length} sessions
                </span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
  {workout.weeks[activeWeek].sessions.map((session, sessionIdx) => (
    <div
      key={sessionIdx}
      className={`border rounded-xl p-4 transition-all duration-200 'border-gray-700 bg-gray-800 hover:border-gray-600'}`}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-lg text-white">
            {session.day}: {session.name}
          </h3>
          <p className={`text-sm text-gray-400`}>
            {session.exercises.length} {session.exercises.length === 1 ? 'exercise' : 'exercises'}
          </p>
        </div>

        {session.completed ? (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-900/50 text-emerald-300 border border-emerald-800">
            <FiCheck className="text-emerald-400" />
            Completed
          </div>
        ) : (
          <button
            onClick={() => handleMarkSessionComplete(activeWeek!, sessionIdx)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-gray-700 hover:bg-gray-600 text-gray-200 border border-gray-600 transition-colors"
          >
            <FiEdit2 className="text-blue-400" />
            Mark Complete
          </button>
        )}
      </div>

      <div className="space-y-3">
        {session.exercises.map((exercise, exerciseIdx) => (
          <div
            key={exerciseIdx}
            className={`p-3 rounded-lg bg-gray-700/50 border-gray-600 border`}
          >
            <div className="flex justify-between items-start">
              <div className="pr-2">
                <h4 className={`font-medium text-white`}>
                  {exercise.name}
                </h4>
                <p className={`text-md text-gray-400`}>
                  {exercise.sets && `${exercise.sets} sets`}
                  {exercise.reps && ` × ${exercise.reps} reps`}
                  {exercise.otherWorkouts && ` ${exercise.otherWorkouts}`}
                  {exercise.RPE && ` @ RPE ${exercise.RPE}`}
                </p>
              </div>
              
              <div className="flex items-center">
                {editingWeight && 
                  editingWeight.weekIdx === activeWeek &&
                  editingWeight.sessionIdx === sessionIdx &&
                  editingWeight.exerciseIdx === exerciseIdx ? (
                    <>
                      {!workout.weeks[activeWeek].sessions[sessionIdx].completed ? (
                        <div className="flex items-center">
                          <input
                            type="number"
                            min={0}
                            step={0.1}
                            className="border border-gray-600 bg-gray-800 text-white rounded px-2 py-1 w-20 text-sm text-right focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={editingWeight.tempWeight}
                            onChange={(e) =>
                              setEditingWeight((prev) =>
                                prev ? { ...prev, tempWeight: e.target.value } : null
                              )
                            }
                          />
                          <button
                            className="ml-2 px-2 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded text-sm transition-colors"
                            onClick={() => {
                              handleWeightChange(
                                activeWeek!,
                                sessionIdx,
                                exerciseIdx,
                                editingWeight.tempWeight
                              );
                              setEditingWeight(null);
                            }}
                          >
                            Save
                          </button>
                          <button
                            className="ml-1 px-2 py-1 bg-gray-600 hover:bg-gray-500 text-white rounded text-sm transition-colors"
                            onClick={() => setEditingWeight(null)}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="text-gray-500 text-sm px-2 py-1 italic">Completed</div>
                      )}
                    </>
                ) : (
                  <>
                    {!workout.weeks[activeWeek].sessions[sessionIdx].completed ? (
                      <button
                        type="button"
                        className={`text-sm px-2.5 py-1 rounded-md ${exercise.weight !== null ? 'bg-blue-900/40 hover:bg-blue-900/60 text-blue-300' : 'bg-gray-700 hover:bg-gray-600 text-gray-300'} border ${exercise.weight !== null ? 'border-blue-800/60' : 'border-gray-600'} transition-colors`}
                        onClick={() =>
                          setEditingWeight({
                            weekIdx: activeWeek!,
                            sessionIdx,
                            exerciseIdx,
                            tempWeight: exercise.weight !== null ? exercise.weight.toString() : '',
                          })
                        }
                      >
                        {exercise.weight !== null ? `${exercise.weight.toFixed(1)} kg` : 'Add weight'}
                      </button>
                    ) : (
                      <div className={`text-sm px-2.5 py-1 rounded ${exercise.weight !== null ? 'text-emerald-300' : 'text-gray-500'}`}>
                        {exercise.weight !== null ? `${exercise.weight.toFixed(1)} kg` : '-'}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ))}
</div>

            {isWeekComplete && !weekSubmitted &&
            <section>
            <div className="mt-8 bg-gray-50 p-5 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Weekly Feedback</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Difficulty Level
                  </label>
                  <select
                    className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={difficultyInput}
                    onChange={(e) => setDifficultyInput(e.target.value)}
                  >
                    <option value="Very Easy">Very Easy</option>
                    <option value="Easy">Easy</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Hard">Hard</option>
                    <option value="Very Hard">Very Hard</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Injuries or Issues
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setInjuriesInput(e.target.value)}
                    className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={injuriesInput}
                    placeholder="e.g. Shoulder pain, Knee discomfort"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Notes
                </label>
                <textarea
                  onChange={(e) => setNotesInput(e.target.value)}
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[100px]"
                  value={notesInput}
                  placeholder="How did this week feel? Any progress or concerns?"
                />
              </div>
              
            </div> 

            <button
                onClick={() =>
                  handleInsightChange(
                    activeWeek!,
                    difficultyInput,
                    injuriesInput,
                    notesInput
                  )
                }
                
                disabled={saving}
                className="flex items-center mt-5 justify-self-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition shadow-md disabled:bg-blue-400"
                >
                {saving ? <FiLoader className="animate-spin" /> : <FiSave />}
                {saving ? 'Saving...' : 'Submit Week'}
                </button>
                </section>}
                {weekSubmitted && (
                  <div className="mt-6 text-green-600 font-medium">
                    ✅ Week submitted! Great job.
                  </div>
                )}
          </div>
        </div>
      )}
    </div>
  );
}