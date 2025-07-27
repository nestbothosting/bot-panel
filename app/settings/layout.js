// app/dashboard/layout.js
import React, { Suspense } from 'react';

export const metadata = {
  title: 'Bot Settings - NestBot',
  description: 'Configure your Discord bot’s behavior, modules, and preferences with NestBot’s advanced bot settings panel.',
  keywords: [
    'bot settings',
    'discord bot config',
    'nestbot bot settings',
    'manage discord bot',
    'bot preferences',
    'bot customization',
    'discord automation',
    'nestbot features'
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
