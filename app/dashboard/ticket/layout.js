// app/dashboard/layout.js
import React, { Suspense } from 'react';

export const metadata = {
  title: 'Ticket System',
  description: 'Create and manage support tickets on your Discord server with ease.',
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
