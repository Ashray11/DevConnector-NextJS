import auth from '@middlewares/auth';
import { NextResponse } from '@node_modules/next/server';
import { connectDB } from '@utils/database';
import Joi from 'joi';
import Profile from '@models/profile';

const schema = Joi.object({
    title: Joi.string().required().messages({
        'any.required': `title is a required field`
    }),
    company: Joi.string().required().messages({
        'any.required': `company is a required field`
    }),
    from: Joi.date().required().messages({
        'any.required': `from date is a required field`
    })
}).unknown(true);

export const PUT = async (req) => {
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
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = body;

    const newExperience = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    };

    try {
        await connectDB();
        const profile = await Profile.findOne({ user: req.user.id });
        profile.experience.unshift(newExperience);
        await profile.save();
        return NextResponse.json(profile, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json([{ message: "Server error." }], { status: 500 });
    }
};