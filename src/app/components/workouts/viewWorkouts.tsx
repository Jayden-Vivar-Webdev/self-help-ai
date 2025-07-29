'use client';

import { useState } from 'react';
import { FiCheck, FiEdit2, FiSave, FiLoader, FiAlertCircle, FiTrendingUp, FiCalendar, FiTarget } from 'react-icons/fi';
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
      <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl border border-slate-200 shadow-sm">
        <div className="bg-red-50 p-4 rounded-full mb-6">
          <FiAlertCircle className="text-4xl text-red-500" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-3">No Workout Data Available</h2>
        <p className="text-slate-600 max-w-md leading-relaxed">
          We couldn&apos;t find any workout plans for your account. Please check back later or contact support.
        </p>
      </div>
    );
  }

  const isWeekComplete = activeWeek !== null && workout?.weeks[activeWeek]?.completedSessions === workout.weeks[activeWeek]?.sessions.length;
  const weekSubmitted = activeWeek !== null && workout?.weeks[activeWeek]?.weekSubmitted === true;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        {/* Header Section */}
        <div className="mb-10">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-3">
              Your Training Program
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Track your progress and build strength with personalized workout plans
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <div className="flex items-center">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <FiCalendar className="text-2xl text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-slate-600">Total Weeks</p>
                  <p className="text-2xl font-bold text-slate-900">{workout.weeks.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <div className="flex items-center">
                <div className="bg-emerald-50 p-3 rounded-lg">
                  <FiTarget className="text-2xl text-emerald-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-slate-600">Current Week</p>
                  <p className="text-2xl font-bold text-slate-900">Week {activeWeek + 1}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <div className="flex items-center">
                <div className="bg-purple-50 p-3 rounded-lg">
                  <FiTrendingUp className="text-2xl text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-slate-600">Progress</p>
                  <p className="text-2xl font-bold text-slate-900">
                    {activeWeek !== null ? Math.round((workout.weeks[activeWeek].completedSessions / workout.weeks[activeWeek].sessions.length) * 100) : 0}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-6 mb-8 rounded-lg shadow-sm">
            <div className="flex items-center">
              <FiAlertCircle className="text-red-400 mr-3 flex-shrink-0 text-lg" />
              <p className="text-red-800 font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Week Navigation */}
        <div className="mb-8">
          <div className="bg-white rounded-xl p-2 shadow-sm border border-slate-200 inline-flex">
            {workout.weeks.map((week, idx) => (
              <button
                key={week.week}
                onClick={() => setActiveWeek(idx)}
                className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 whitespace-nowrap relative ${
                  activeWeek === idx 
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Week {week.week}
                {week.completedSessions === week.sessions.length && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {activeWeek !== null && (
          <div className="space-y-8">
            {/* Week Header */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">
                    Week {activeWeek + 1}
                  </h2>
                  <p className="text-slate-600">
                    Complete all sessions to unlock weekly feedback
                  </p>
                </div>
                <div className="bg-slate-50 rounded-lg p-4">
                  <div className="text-center">
                    <p className="text-sm font-medium text-slate-600 mb-1">Session Progress</p>
                    <p className="text-2xl font-bold text-slate-900">
                      {workout.weeks[activeWeek].completedSessions}/{workout.weeks[activeWeek].sessions.length}
                    </p>
                    <div className="w-24 bg-slate-200 rounded-full h-2 mt-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${(workout.weeks[activeWeek].completedSessions / workout.weeks[activeWeek].sessions.length) * 100}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sessions Grid */}
            <div className="grid lg:grid-cols-2 gap-6">
              {workout.weeks[activeWeek].sessions.map((session, sessionIdx) => (
                <div
                  key={sessionIdx}
                  className={`bg-white rounded-xl shadow-sm border transition-all duration-200 overflow-hidden ${
                    session.completed 
                      ? 'border-emerald-200 bg-gradient-to-br from-white to-emerald-50' 
                      : 'border-slate-200 hover:shadow-md hover:border-slate-300'
                  }`}
                >
                  {/* Session Header */}
                  <div className="p-6 border-b border-slate-100">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-1">
                          {session.day}: {session.name}
                        </h3>
                        <p className="text-slate-600 flex items-center gap-2">
                          <FiTarget className="text-sm" />
                          {session.exercises.length} {session.exercises.length === 1 ? 'exercise' : 'exercises'}
                        </p>
                      </div>

                      {session.completed ? (
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                          <FiCheck className="text-emerald-600" />
                          Completed
                        </div>
                      ) : (
                        <button
                          onClick={() => handleMarkSessionComplete(activeWeek!, sessionIdx)}
                          className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 transition-all duration-200 hover:shadow-sm"
                        >
                          <FiEdit2 className="text-blue-600" />
                          Mark Complete
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Exercises */}
                  <div className="p-6 space-y-4">
                    {session.exercises.map((exercise, exerciseIdx) => (
                      <div
                        key={exerciseIdx}
                        className="bg-slate-50 rounded-lg p-4 border border-slate-100"
                      >
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex-1">
                            <h4 className="font-semibold text-slate-900 mb-1">
                              {exercise.name}
                            </h4>
                            <p className="text-slate-600 text-sm">
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
                                    <div className="flex items-center gap-2">
                                      <input
                                        type="number"
                                        min={0}
                                        step={0.1}
                                        className="border border-slate-300 bg-white text-slate-900 rounded-lg px-3 py-2 w-20 text-sm text-right focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                        value={editingWeight.tempWeight}
                                        onChange={(e) =>
                                          setEditingWeight((prev) =>
                                            prev ? { ...prev, tempWeight: e.target.value } : null
                                          )
                                        }
                                      />
                                      <button
                                        className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm"
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
                                        className="px-3 py-2 bg-slate-500 hover:bg-slate-600 text-white rounded-lg text-sm font-medium transition-colors"
                                        onClick={() => setEditingWeight(null)}
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  ) : (
                                    <div className="text-slate-500 text-sm px-3 py-2 italic bg-slate-100 rounded-lg">
                                      Completed
                                    </div>
                                  )}
                                </>
                            ) : (
                              <>
                                {!workout.weeks[activeWeek].sessions[sessionIdx].completed ? (
                                  <button
                                    type="button"
                                    className={`text-sm px-4 py-2 rounded-lg font-medium transition-all ${
                                      exercise.weight !== null 
                                        ? 'bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200' 
                                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                                    }`}
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
                                  <div className={`text-sm px-4 py-2 rounded-lg font-medium ${
                                    exercise.weight !== null 
                                      ? 'text-emerald-700 bg-emerald-50 border border-emerald-200' 
                                      : 'text-slate-500 bg-slate-100'
                                  }`}>
                                    {exercise.weight !== null ? `${exercise.weight.toFixed(1)} kg` : 'No weight'}
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

            {/* Weekly Feedback Section */}
            {isWeekComplete && !weekSubmitted && (
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200 shadow-sm">
                <div className="p-8">
                  <div className="text-center mb-8">
                    <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <FiCheck className="text-2xl text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Week Complete!</h3>
                    <p className="text-slate-600">Share your feedback to help us improve your next week</p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-3">
                        How challenging was this week?
                      </label>
                      <select
                        className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-slate-900 font-medium transition-all"
                        value={difficultyInput}
                        onChange={(e) => setDifficultyInput(e.target.value)}
                      >
                        <option value="">Select difficulty level</option>
                        <option value="Very Easy">Very Easy</option>
                        <option value="Easy">Easy</option>
                        <option value="Moderate">Moderate</option>
                        <option value="Hard">Hard</option>
                        <option value="Very Hard">Very Hard</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-3">
                        Any injuries or discomfort?
                      </label>
                      <input
                        type="text"
                        onChange={(e) => setInjuriesInput(e.target.value)}
                        className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-slate-900 transition-all"
                        value={injuriesInput}
                        placeholder="e.g. Shoulder pain, Knee discomfort"
                      />
                    </div>
                  </div>

                  <div className="mb-8">
                    <label className="block text-sm font-semibold text-slate-700 mb-3">
                      Additional feedback
                    </label>
                    <textarea
                      onChange={(e) => setNotesInput(e.target.value)}
                      className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-slate-900 min-h-[120px] transition-all resize-none"
                      value={notesInput}
                      placeholder="How did this week feel? Any progress, concerns, or suggestions?"
                    />
                  </div>

                  <div className="text-center">
                    <button
                      onClick={() =>
                        handleInsightChange(
                          activeWeek!,
                          difficultyInput,
                          injuriesInput,
                          notesInput
                        )
                      }
                      disabled={saving || !difficultyInput}
                      className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg shadow-blue-500/25 font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {saving ? <FiLoader className="animate-spin text-xl" /> : <FiSave className="text-xl" />}
                      {saving ? 'Submitting...' : 'Submit Week Feedback'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {weekSubmitted && (
              <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-8 text-center border-2 border-emerald-200">
                <div className="bg-emerald-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <FiCheck className="text-2xl text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-emerald-800 mb-2">
                  Week Submitted Successfully!
                </h3>
                <p className="text-emerald-700">
                  Great job completing this week. Your next week will be generated based on your feedback.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}