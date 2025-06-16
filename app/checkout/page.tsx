'use client';

import { Suspense } from 'react';
import CheckoutClientPage from '@/app/checkout/CheckoutClientPage';

export const dynamic = 'force-dynamic';

export default function CheckoutPageWrapper() {
  return (
    <Suspense fallback={<div className="text-center text-white mt-10">Loading...</div>}>
      <CheckoutClientPage />
    </Suspense>
  );
}
