import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { User, IUser } from "@/models/User";
import dbConnect from "@/lib/dbConnect";

export async function POST(req: Request){
    try{
        await dbConnect()
        const body: IUser = await req.json()

        const { username, password }: IUser = body

        // find username in db
        const existingUser = await User.findOne({ username })

        if(existingUser){
            // check if psswd entered matches
            const psswdMatch = await bcrypt.compare(password, existingUser.password)
            
            if(psswdMatch){
                return NextResponse.json({ message: "User successfully authenticated" }, { status: 200})
            } else {
                return NextResponse.json({ message: "Incorrect Password. Try again." }, { status: 401})
            }
        } else {
            // username not found in db
            return NextResponse.json({ message: "Username not found"}, {status: 401})
        }
    } catch (error){
        console.log(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}