// app/dashboard/layout.js
import React, { Suspense } from 'react';

export const metadata = {
    title: 'Embed Message Builder',
    description: 'Design and customize rich Discord embed messages with ease using our no-code embed builder.',
    keywords: ["embed builder", "discord embed", "rich message", "embed bot", "nestbot embed", "discord", "embed builder", "no code embed discord bot"]
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
