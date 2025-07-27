// app/dashboard/layout.js
import React, { Suspense } from 'react';

export const metadata = {
    title: 'Ticket System',
    description: 'Create and manage support tickets on your Discord server with ease. Create a ticket support system in your Discord server using NestBot’s prebuilt panel UI.',
    keywords: ["ticket bot", "discord support", "discord ticket system", "ticket panel", "nestbot ticket", "ticket tool","ticket bot discord","free ticket bot"]

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
