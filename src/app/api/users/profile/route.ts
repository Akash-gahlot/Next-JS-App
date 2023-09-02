import User from "@/Models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/dbConfig/connection";

connectDb();


export async function POST(request: NextRequest) { 
    try {
        const reqBody = await request.json();                
        const user = await User.findOne({ _id: reqBody.id });
        if (user)
        {
            return NextResponse.json({ user }, { status: 200 });
        }
        return NextResponse.json({message:"User doesn't exist "},{status:401})
        
    }
    catch (err) { 
        return NextResponse.json({message:"DB Problem"},{status:500})
    }
}