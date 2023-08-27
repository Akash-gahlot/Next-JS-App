// import jwt from "jsonwebtoken";
import { NextResponse, NextRequest } from "next/server";
import { connectDb } from "@/dbConfig/connection";
import User from "@/Models/userModel";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { json } from "stream/consumers";
const SECRET_KEY = "NEXTJWT";

connectDb();

export async function POST(request: NextRequest) { 
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;
       
        const user = await User.findOne({ email });
        if (user) {
            const validPassword = await bcryptjs.compare(password, user.password);
            console.log("password value : " + validPassword);
            if (!validPassword) { 
                return NextResponse.json({ message: "Wrong Password" }, { status: 201 });
            }
            const tokenData = {
                id: user._id,
                email: user.email,
                username:user.username
            }
            const token = await jwt.sign(tokenData, SECRET_KEY, { expiresIn: "3h" });
            const response = NextResponse.json({ message: "Successfull Login", success: true }, { status: 200 });
            response.cookies.set("token", token, { httpOnly: true });
            return response;
        }
        else { 
            return NextResponse.json({ message: "User doesn't exist" }, { status: 201 });
        }
    }
    catch (err) { 
        console.log(err);
        return NextResponse.json({ message: "Some error while login" }, { status: 500 });
    }
}