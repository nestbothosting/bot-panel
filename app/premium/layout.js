// app/dashboard/layout.js
import React, { Suspense } from 'react';

export const metadata = {
  title: 'Premium Features',
  description: 'Upgrade to NestBot Premium to unlock exclusive features, faster performance, and enhanced bot capabilities.',
  keywords: ['nestbot premium', 'premium features', 'upgrade bot', 'exclusive features', 'premium discord bot']
};



export default function DashboardLayout({ children }) {
    return (
        <>
            <Suspense fallback={<div>Loading Dashboard...</div>}>
                {children}
            </Suspense>
        </>
    );
}
