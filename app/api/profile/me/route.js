import auth from "@middlewares/auth";
import { NextResponse } from "@node_modules/next/server";
import Profile from "@models/profile";
import User from "@models/user";
import { connectDB } from "@utils/database";

export const GET = async (req) => {
    const authResponse = await auth(req);
    if(authResponse) {
        return authResponse;
    }

    try {
        await connectDB();
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);

        if(!profile) {
            return NextResponse.json({ message: "There is no profile for this user."}, { status: 400 });
        }
        return NextResponse.json({ profile }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Server Error." }, { status: 500});
    }    
};