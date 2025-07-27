// app/dashboard/layout.js
import React, { Suspense } from 'react';

export const metadata = {
  title: 'Bot Status',
  description: 'Check the current status and uptime of your Discord bot powered by NestBot. Real-time monitoring included.',
  keywords: ['bot status', 'uptime monitor', 'nestbot bot status', 'discord bot online', 'monitoring']
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
