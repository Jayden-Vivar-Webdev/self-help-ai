'use client';

import React, { Suspense } from 'react';
import SignUpContent from '@/app/lib/helpers/signupcontext/SignUpContext';

export const dynamic = 'force-dynamic';

export default function SignUpPage() {
  return (
    <Suspense fallback={<div>Loading signup...</div>}>
      <SignUpContent />
    </Suspense>
  );
}
