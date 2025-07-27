// app/dashboard/layout.js
import React, { Suspense } from 'react';

export const metadata = {
    title: 'YouTube Notification System',
    description: 'Automatically send notifications to your Discord server when a YouTube channel uploads a new video. Get notified in Discord when a YouTube channel uploads a new video using NestBot integration.',
    keywords: ["youtube bot", "discord youtube", "video notification", "yt discord alert", "nestbot youtube", "youtube bot free", "yt bot free notification", "discord free yt notification bot"]
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
