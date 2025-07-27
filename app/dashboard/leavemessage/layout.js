// app/dashboard/layout.js
import React, { Suspense } from 'react';

export const metadata = {
    title: 'Leave Message',
    description: 'Create and manage custom leave messages for your Discord server to notify when a member leaves. Send customized leave messages when members exit your Discord server.',
    keywords: ["leave message", "discord leave bot", "goodbye message", "exit notification", "nestbot leave", "discord bot message leave"]
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
