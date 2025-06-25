// app/dashboard/layout.js
import React, { Suspense } from 'react';

export const metadata = {
  title: 'Leave Message',
  description: 'Create and manage custom leave messages for your Discord server to notify when a member leaves.',
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
