// app/dashboard/layout.js
import React, { Suspense } from 'react';

export const metadata = {
  title: 'Dashboard',
  description: 'dashboard Page',
};

export default function DashboardLayout({ children }) {
  return (
    <Suspense fallback={<div>Loading Dashboard...</div>}>
      {children}
    </Suspense>
  );
}
