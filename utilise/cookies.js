"use client";

import { getCookie, setCookie } from 'cookies-next'

export const SetUserCookies = (user) => {
    if (!user) return { status: false, message: "User is Required" }
    setCookie("user", JSON.stringify(user), {
        maxAge: 60 * 60 * 24, // 1 day
        path: "/",            // available everywhere
        secure: true,         // only over HTTPS
        sameSite: "strict",
    });
    return { status: true, message: "set User" }
}

export const GetUserCookies = () => {
    const cookie = getCookie("user");
    const user = cookie ? JSON.parse(cookie) : null;
    return user;
}