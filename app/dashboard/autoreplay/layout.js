import React, { Suspense } from 'react';

export const metadata = {
    title: 'Auto Replay Messages',
    description: 'Automatically respond to specific messages using customizable triggers in NestBot. bot with NestBot. Set triggers and automated responses to enhance your server’s engagement.',
    keywords: ["auto reply", "discord autoreply", "nestbot triggers", "message automation", "custom commands", "discord bot autoreply"]
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
