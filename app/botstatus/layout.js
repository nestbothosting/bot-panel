// app/dashboard/layout.js
import React, { Suspense } from 'react';

export const metadata = {
  title: 'Bot Status',
  description: 'Monitor the real-time status of your Discord bots, and server connectivity with Bot Status.',
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
