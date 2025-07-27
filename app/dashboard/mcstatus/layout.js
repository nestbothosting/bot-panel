// app/dashboard/layout.js
import React, { Suspense } from 'react';

export const metadata = {
    title: 'Minecraft Server Statu',
    description: 'Check real-time Minecraft server status and create status embeds for Discord. Show live Minecraft server status in your Discord using NestBot’s MC status module. Java and Bedrock',
    keywords: ["minecraft bot", "mc status", "discord minecraft", "server status", "minecraft integration","mc status bot","mc status bot","discord minecraft status bot", "papper mc status bot", "java server status bor", "bedrock server status bor"]
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
