'use client';

import { useEffect, useState } from 'react';
import WorkoutMetrics from '@/app/components/metrics/performance';
import { checkUserProfile } from '@/app/lib/userCheck';


export default function CompletedTasks() {
  const [uid, setUid] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const userProfile = await checkUserProfile();
      setUid(userProfile.uid);
    };

    fetchUserProfile(); // <- you forgot to call it
  }, []);

  if (!uid) return <div>Loading user data...</div>;

  return (
    <section className="grid p-10 gap-10">
      <h2 className="text-xl font-bold mb-2">Completed Tasks</h2>
      <WorkoutMetrics uid={uid} />
    </section>
  );
}
