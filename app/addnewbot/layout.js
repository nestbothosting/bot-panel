// app/dashboard/layout.js
import React, { Suspense } from 'react';

export const metadata = {
    title: 'Add New Bot',
    description: 'Add New Discord Bot Here',
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
