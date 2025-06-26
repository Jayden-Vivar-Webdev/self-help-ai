'use client'

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export const dynamic = 'force-dynamic';


export default function VerifyPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');
  const [status, setStatus] = useState('Verifying...');

  useEffect(() => {
    if (!token) {
      setStatus('Missing token');
      return;
    }

    const verifyToken = async () => {
      const res = await fetch(`/api/verify?token=${token}`);
      const data = await res.json();

      if (res.ok) {
        setStatus('Verification successful! Redirecting to sign in...');
        setTimeout(() => {
          router.push(`/signup?verified=${token}`);
        }, 2000);
      } else {
        setStatus(data.error || 'Verification failed');
      }
    };

    verifyToken();
  }, [token]);

  return (
    <div className="p-6 text-center">
      <h1 className="text-xl font-semibold">{status}</h1>
    </div>
  );
}
