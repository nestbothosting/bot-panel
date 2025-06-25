// app/dashboard/layout.js
import React, { Suspense } from 'react';

export const metadata = {
  title: 'Minecraft Server Status',
  description: 'Check real-time Minecraft server status and create status embeds for Discord.',
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
