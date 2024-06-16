import Profile from "@models/profile";
import auth from "@middlewares/auth";
import { NextResponse } from "@node_modules/next/server";
import { connectDB } from "@utils/database";

export const DELETE = async (req, { params }) => {
    const authResponse = auth(req);
    if(authResponse) {
        return authResponse;
    }

    try {
        await connectDB();
        const profile = await Profile.findOne({ user: req.user.id });
        profile.education = profile.education.filter(edu => edu._id.toString() !== params.edu_id);
        await profile.save();
        return NextResponse.json(profile, { status: 200 });
    } catch (error) {
        console.error(error); 
        return NextResponse.json({ error: "Server Error." }, { status: 500 });
    }
};