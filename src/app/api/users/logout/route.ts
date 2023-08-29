import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) { 
    try {
        console.log("token valuer before logout : " + request.cookies.get("token")?.value);
        const response = NextResponse.json({
            message: "Successfull Logout"
        }, { status: 200 });
        await response.cookies.set("token", "", { httpOnly: true , expires: new Date(0)  });
        console.log("token valuer after logout : " + request.cookies.get("token")?.value);
        return response;
    }
    catch (err) { 
        return NextResponse.json({ staus: 500 });
    }  
}