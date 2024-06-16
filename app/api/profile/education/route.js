import auth from '@middlewares/auth';
import { NextResponse } from '@node_modules/next/server';
import { connectDB } from '@utils/database';
import Joi from 'joi';
import Profile from '@models/profile';

const schema = Joi.object({
    school: Joi.string().required().messages({
        'any.required': `school is a required field`
    }),
    degree: Joi.string().required().messages({
        'any.required': `degree is a required field`
    }),
    fieldofstudy: Joi.string().required().messages({
        'any.required': `field of study is a required field`
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
            {
                errors: error.details.map(detail => ({
                    field: detail.path.join('.'),
                    message: detail.message
                }))
            }, 
            { status: 400 }
        );
    }

    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    } = body;

    const newEducation = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    };

    try {
        await connectDB();
        const profile = await Profile.findOne({ user: req.user.id });
        profile.education.unshift(newEducation);
        await profile.save();
        return NextResponse.json(profile, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Server error." }, { status: 500 });
    }
};