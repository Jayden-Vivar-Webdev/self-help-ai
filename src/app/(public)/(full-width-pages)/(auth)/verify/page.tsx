'use client'

import React, { Suspense } from 'react';
import VerifyContent from '@/app/lib/helpers/verifyPage/verifypage';

export const dynamic = 'force-dynamic';

export default function VerifyPage() {
  return (
    <Suspense fallback={<div>Loading verification...</div>}>
      <VerifyContent />
    </Suspense>
  );
}
