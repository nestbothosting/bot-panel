// app/dashboard/layout.js
import React, { Suspense } from 'react';

export const metadata = {
  title: 'Add New Discord Bot',
  description: 'Add your Discord bot to NestBot in a few simple steps and unlock powerful features for managing your server.',
  keywords: ['add discord bot', 'new discord bot', 'nestbot setup', 'bot onboarding', 'discord integration', 'add no code bot']
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
