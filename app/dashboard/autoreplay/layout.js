import React, { Suspense } from 'react';

export const metadata = {
  title: 'Auto Replay',
  description: 'Easily configure automatic replies for your Discord bot with NestBot. Set triggers and automated responses to enhance your server’s engagement.',
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
