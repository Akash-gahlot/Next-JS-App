
import User from "@/Models/userModel";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/dbConfig/connection";
import { json } from "stream/consumers";
const SECRET_KEY = "NEXTJWT";

connectDb();

export async function GET(request: NextRequest) { 
    try {
        const token = request.cookies.get("token")?.value || "";
        if (token != "") {
            const decodedToken = await jwt.verify(token, SECRET_KEY);
            return NextResponse.json({ message: decodedToken }, { status: 201 });
        }
        else { 
            return NextResponse.json({ message: "Please Login first " }, { status: 401 });
        }
    }
    catch (err:any) { 
        return NextResponse.json({ message: err.message }, { status: 403 });
    }
}

