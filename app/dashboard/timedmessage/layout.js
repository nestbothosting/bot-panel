// app/dashboard/layout.js
import React, { Suspense } from 'react';

export const metadata = {
  title: 'Timed Message System',
  description: 'Schedule and automate Discord messages to be sent at specific times using the Timed Message System.',
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
