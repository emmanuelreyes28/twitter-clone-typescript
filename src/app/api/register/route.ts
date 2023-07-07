import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { User, IUser } from "@/models/User";
// import { connectToDatabase } from "@/services/database.service";
import clientPromise from "@/lib/mongodb";

// connectToDatabase()

export async function POST(req: Request){
    await clientPromise;
    // const db = client.db();

    try{
        // receive data through request body
        const body: IUser = await req.json()

        // destructure body data
        const { username, email, password } = body

        // check if email or username is already in use
        const existingEmail = await User.exists({ email })
        const existingUsername = await User.exists({ username })

        if(existingEmail){
            return NextResponse.json(
                { message: "This email has an existing account" },
                { status: 400 }
              );
        }

        if(existingUsername){
            return NextResponse.json(
                { message: "Username is already taken" },
                { status: 400 }
              )
        }

        // encrypt password with 10 salting rounds
        const hashedPsswd = await bcrypt.hash(password, 10)

        // create new user
        const newUser = new User({
            username, email, password: hashedPsswd,
        })
        
        // save new user to db
        await newUser.save()

        return NextResponse.json({ message: "User created successfully" }, { status: 201})
    } catch (error){
        console.log(error);
        return NextResponse.json({ error: "Internal server error"}, { status: 500})
    }
}