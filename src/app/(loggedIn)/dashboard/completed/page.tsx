'use client';

import { useState } from 'react';

import { retrieveHistory } from '@/app/lib/helpers/frontend/requestHistory';

interface WorkoutHistory {
  _id: string ;
  userId: string;
  week: number;
  completedSessions: { $numberInt: string };
  weekSubmitted: boolean;
  feedback: {
    difficulty: string;
    injuries: Array<[]>;
    notes: string;
    _id: { $oid: string };
  };
  sessions: Array<{
    day: string;
    name: string;
    exercises: Array<{
      name: string;
      sets: { $numberInt: string } | null;
      reps: { $numberInt: string } | null;
      weight: { $numberInt: string } | null;
      otherWorkouts: string | null;
      RPE: number | null;
      _id: { $oid: string };
    }>;
    completed: boolean;
    _id: string;
  }>;
  createdAt: string;
  __v: { $numberInt: string };
}

export default function CompletedTasks() {
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [workoutHistory, setWorkoutHistory] = useState<WorkoutHistory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const months = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' }
  ];

  // Generate year options (current year and past 3 years)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 4 }, (_, i) => currentYear - i);


  const fetchWorkoutHistory = async () => {
    
    setLoading(true);
    setError(null);

    try {
      
      const data = await retrieveHistory(selectedMonth, selectedYear)
      setWorkoutHistory(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchWorkoutHistory();
  };

  

  return (
    <section className="grid p-10 gap-10">
      <h2 className="text-xl font-bold mb-2">Completed Tasks</h2>
      
      {/* Workout History Filter Section */}
      <div className="bg-white rounded-lg shadow-md p-6 border">
        <h3 className="text-lg font-semibold mb-4">Workout History</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label htmlFor="month" className="block text-sm font-medium text-gray-700 mb-1">
                Month
              </label>
              <select
                id="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {months.map((month) => (
                  <option key={month.value} value={month.value}>
                    {month.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex-1">
              <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
                Year
              </label>
              <select
                id="year"
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Loading...' : 'Fetch History'}
            </button>
          </div>
        </form>

        {/* Error Display */}
        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* Results Display */}
        {workoutHistory.length > 0 && (
          <div className="mt-6 space-y-4">
            <h4 className="font-medium text-gray-900">
              Found {workoutHistory.length} workouts for {months.find(m => m.value === selectedMonth)?.label} {selectedYear}
            </h4>
            
            <div className="grid gap-4">
              {workoutHistory.map((workout) => (
                
                <div key={workout._id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h5 className="font-medium">Week {workout.week}</h5>
                      <p className="text-sm text-gray-600">
                        Completed Sessions: {workout.completedSessions.$numberInt} / {workout.sessions.length}
                      </p>
                      <p className="text-sm text-gray-600">
                        Created: {new Date(workout.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      workout.weekSubmitted 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {workout.weekSubmitted ? 'Submitted' : 'Pending'}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    {workout.sessions.map((session) => (
                      <div key={session._id} className="flex justify-between items-center text-sm">
                        <span className="font-medium">{session.day}: {session.name}</span>
                        <span className={`px-2 py-1 text-xs rounded ${
                          session.completed 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {session.completed ? 'Complete' : 'Pending'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {workoutHistory.length === 0 && !loading && !error && (
          <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-md">
            <p className="text-gray-600 text-sm">No workout history found for the selected period.</p>
          </div>
        )}
      </div>

      {/* <WorkoutMetrics uid={uid} /> */}
    </section>
  );
}