// app/dashboard/layout.js
import React, { Suspense } from 'react';

export const metadata = {
    title: 'Welcome Message',
    description: 'Create and customize welcome messages to greet new members when they join your Discord server. Send personalized welcome messages to new users joining your server.',
    keywords: ["welcome message", "discord welcome", "nestbot greet", "join message", "bot greetings", "welcome discord bot free", "new user welcome message bot", "new user notify bot"]
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
