import Profile from "@models/profile";
import { connectDB } from "@utils/database";
import { NextResponse } from "@node_modules/next/server";

export const GET = async(req, { params }) => {
    try {
        await connectDB();
        const profile = await Profile.findOne({ user: params.user_id}).populate('user', ['name', 'avatar']);

        if(!profile) {
            return NextResponse.json({ message: "Profile not found!" }, { status: 400 });
        }

        return NextResponse.json(profile, { status: 200 });
    } catch (error) {
        console.error(error);
        if(error.kind == 'ObjectId') {
            return NextResponse.json({ message: "Profile not found!" }, { status: 400 });
        }
        return NextResponse.json({ message: "Server Error." }, { status: 500 });
    }
};