// app/dashboard/layout.js
import React, { Suspense } from 'react';

export const metadata = {
  title: 'Auto Role System for Discord – Instantly Assign Roles to New Members. Auto Role Assignment',
  description: 'Effortlessly auto-assign roles to new Discord members with the Auto Role System. Welcome users, manage ranks, and streamline your server—all without manual setup',
  keywords: ["autorole", "discord role", "auto role bot", "nestbot role manager", "discord automation","add role","welcome role add","welcome role"]

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
