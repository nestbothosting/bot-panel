// app/dashboard/layout.js
import React, { Suspense } from 'react';

export const metadata = {
  title: 'Welcome Message',
  description: 'Create and customize welcome messages to greet new members when they join your Discord server.',
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
