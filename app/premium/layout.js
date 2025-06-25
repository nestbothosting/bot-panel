// app/dashboard/layout.js
import React, { Suspense } from 'react';

export const metadata = {
    title: 'Premium',
    description: 'Unlock advanced features with NextBot Premium, including 24/7 uptime, priority support.',
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
