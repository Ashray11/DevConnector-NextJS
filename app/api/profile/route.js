import Joi from 'joi';
import auth from "@middlewares/auth";
import { NextResponse } from '@node_modules/next/server';
import { connectDB } from '@utils/database';
import Profile from "@models/profile";
import User from "@models/user";
import Post from '@models/post';
import normalize from 'normalize-url';

const schema = Joi.object({
    status: Joi.string().required().messages({
        'any.required': `status is a required field`
    }),
    skills: Joi.string().required().messages({
        'any.required': `skills is a required field`
    })
}).unknown(true);

export const POST = async (req) => {
    const authResponse = auth(req);
    if(authResponse) {
        return authResponse;
    }

    const body = await req.json();
    
    const { error } = schema.validate(body, { abortEarly: false });
    if (error) {
        return NextResponse.json(
            error.details.map(detail => ({
                message: detail.message
            })),
            { status: 400 }
          );
    }

    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin
    } = body;

    const profileFields = {
        user: req.user.id,
        company,
        location,
        website: website === '' ? '' : normalize(website, { forceHttps: true }),
        bio,
        skills: Array.isArray(skills)
          ? skills
          : skills.split(',').map(skill => ' ' + skill.trim()),
        status,
        githubusername
    };
  
      const socialfields = { youtube, twitter, instagram, linkedin, facebook };
      for (const [key, value] of Object.entries(socialfields)) {
        if (value.length > 0)
            socialfields[key] = normalize(value, { forceHttps: true });
      }
      profileFields.social = socialfields;

    try {
        await connectDB();
        let profile = await Profile.findOne({ user: req.user.id });

        if(profile) {
            profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true });
            return NextResponse.json(profile, { status: 200 });
        }

        profile = new Profile(profileFields);
        await profile.save();
        return NextResponse.json(profile, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json([{ message: "Server Error." }], { status: 500 });
    }
};

export const GET = async(req) => {
    try {
        await connectDB();
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        return NextResponse.json(profiles, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json([{ message: "Server Error." }], { status: 500 });
    }
};

export const DELETE = async(req) => {
    const authResponse = auth(req);
    if(authResponse) {
        return authResponse;
    }

    try {
        await connectDB();
        await Post.deleteMany({ user: req.user.id });
        await Profile.findOneAndDelete({ user: req.user.id });
        await User.findOneAndDelete({ _id: req.user.id });
        return NextResponse.json([{ message: "User deleted successfully!"}], { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json([{ message: "Server Error." }], { status: 500 });
    }
};