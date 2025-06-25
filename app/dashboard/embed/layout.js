// app/dashboard/layout.js
import React, { Suspense } from 'react';

export const metadata = {
  title: 'Create Embed',
  description: 'Design and customize rich Discord embed messages with ease using our no-code embed builder.',
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
