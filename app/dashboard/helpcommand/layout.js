// app/dashboard/layout.js
import React, { Suspense } from 'react';

export const metadata = {
    title: 'Discord Nestbot Help Command Builder | Easy Command Setup',
    description: 'Easily create and customize help commands for your Discord Nestbot. Build structured help menus, organize commands, and improve user experience effortlessly.',
    keywords: [
        "discord help command",
        "nestbot help builder",
        "discord bot help",
        "command menu builder",
        "nestbot commands"
    ]
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
