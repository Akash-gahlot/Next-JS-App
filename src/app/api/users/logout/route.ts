import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) { 
    try {
        const response = NextResponse.json({
            message: "Successfull Logout"
        }, { status: 200 });
        await response.cookies.set("token", "", { httpOnly: true , expires: new Date(0)  });
        return response;
    }
    catch (err) { 
        return NextResponse.json({ staus: 500 });
    }  
}