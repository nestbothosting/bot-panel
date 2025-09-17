import { NextResponse } from "next/server";

export async function GET() {
    const response = NextResponse.json({ status:true, message:"logout" })
    response.cookies.set("user", "", { maxAge: -1 });
    return response;
}
