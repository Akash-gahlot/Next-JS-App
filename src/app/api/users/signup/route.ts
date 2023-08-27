import { connectDb } from "@/dbConfig/connection";
import bcryptjs from "bcryptjs";
import { NextResponse, NextRequest } from "next/server";
import mongoose from "mongoose";
import User from "@/Models/userModel";

connectDb();

export async function POST(request: NextRequest) { 
    
    try {
        const reqBody = await request.json();
        const { username, email, password } = reqBody;

        const user = await User.findOne({ email });
        if (user) { 
            return NextResponse.json({ message: "User already exist" }, { status: 200 });
        }
        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, salt);
        const newUser = new User({
            username,
            email,
            password:hashPassword
        })
        const savedUser = await newUser.save();
        return NextResponse.json({ message: "User Added Successfull" ,success:true,savedUser}, { status: 201 } );
    }
    catch (err: any) { 
        return NextResponse.json({ message: "Some error while signing up : " + err.message }, {status:500});
    }

}