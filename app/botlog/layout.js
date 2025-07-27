// app/dashboard/layout.js
import React, { Suspense } from 'react';

export const metadata = {
  title: 'Bot Logs',
  description: 'View all activity logs related to your Discord bot including commands used, events triggered, and actions taken.',
  keywords: ['bot logs', 'discord activity log', 'nestbot history', 'command logs', 'bot monitoring']
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
