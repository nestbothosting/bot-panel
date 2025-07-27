// app/dashboard/layout.js
import React, { Suspense } from 'react';

export const metadata = {
  title: 'Dashboard',
  description: 'Access the main NestBot dashboard to configure features, manage modules, and customize your Discord server.',
  keywords: ['discord dashboard', 'nestbot panel', 'bot configuration', 'dashboard control', 'discord management']
};

export default function DashboardLayout({ children }) {
  return (
    <Suspense fallback={<div>Loading Dashboard...</div>}>
      {children}
    </Suspense>
  );
}
