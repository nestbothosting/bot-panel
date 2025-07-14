// app/dashboard/layout.js
import React, { Suspense } from 'react';

export const metadata = {
  title: 'Instagram to Discord Notifier | Real-Time Post Alerts',
  description: 'Get real-time Instagram post alerts directly in your Discord server. Automatically track new posts from any Instagram account and stay updated instantly.',
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
