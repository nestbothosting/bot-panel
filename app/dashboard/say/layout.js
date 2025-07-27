import React, { Suspense } from 'react';

export const metadata = {
    title: 'Say Text Message',
    description: 'Make NestBot say custom messages in your Discord server. Great for fun, announcements, and more—easy and powerful!. Make your bot say anything with NestBot’s advanced text-to-speech and say features.',
    keywords: ["say command", "discord bot say", "text command", "nestbot say", "bot speech", "say message bot", "say bot discord"]
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
