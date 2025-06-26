'use client';

import { useEffect, useState } from 'react';

interface Metrics {
  sessionsCompleted: number;
  totalSessions: number;
  currentStreak: number;
  averageRPE: number;
  weeklyLoad: number;
  loadChange: number; // %
  topLift?: string;
  topDistance?: string;
  feedbackDifficulty?: string;
}

export default function WorkoutMetrics({ uid }: { uid: string }) {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await fetch('/api/metrics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ uid }),
        });

        if (!res.ok) throw new Error('Failed to fetch metrics');
        const data = await res.json();
        setMetrics(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, [uid]);

  if (loading) return <div>Loading performance metrics...</div>;
  if (!metrics) return <div>No metrics available.</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Performance Summary</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <MetricCard label="Sessions Completed" value={`${metrics.sessionsCompleted} / ${metrics.totalSessions}`} />
        <MetricCard label="Current Streak" value={`${metrics.currentStreak} weeks`} />
        <MetricCard label="Average RPE" value={metrics.averageRPE.toFixed(1)} />
        <MetricCard label="Weekly Load" value={`${metrics.weeklyLoad.toLocaleString()} kg`} />
        <MetricCard label="Load Change" value={`${metrics.loadChange >= 0 ? '+' : ''}${metrics.loadChange.toFixed(1)}%`} />
        {metrics.topLift && <MetricCard label="Top Lift" value={metrics.topLift} />}
        {metrics.topDistance && <MetricCard label="Top Run" value={metrics.topDistance} />}
        {metrics.feedbackDifficulty && <MetricCard label="Reported Difficulty" value={metrics.feedbackDifficulty} />}
      </div>
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="border rounded-lg p-4 shadow bg-white">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="text-xl font-semibold">{value}</div>
    </div>
  );
}
