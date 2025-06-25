// app/dashboard/layout.js
import React, { Suspense } from 'react';

export const metadata = {
    title: 'YouTube Notification System',
    description: 'Automatically send notifications to your Discord server when a YouTube channel uploads a new video.',
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
