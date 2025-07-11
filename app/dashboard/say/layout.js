import React, { Suspense } from 'react';

export const metadata = {
  title: 'Say Text Message',
  description: 'Make NestBot say custom messages in your Discord server. Great for fun, announcements, and more—easy and powerful!',
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
