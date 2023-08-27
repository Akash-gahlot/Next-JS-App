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
        console.log(reqBody);

        const user = await User.findOne({ email });
        if (user) { 
            console.log("403");
            return NextResponse.json({ message: "User already exist" }, { status: 403 });
        }
        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, salt);
        const newUser = new User({
            username,
            email,
            password:hashPassword
        })
        const savedUser = await newUser.save();
        console.log("201");
        return NextResponse.json({ message: "User Added Successfull" ,success:true,savedUser}, { status: 201 } );
    }
    catch (err: any) { 
        console.log("500");
        return NextResponse.json({ message: "Some error while signing up : " + err.message }, {status:500});
    }

}