import auth from '@middlewares/auth';
import User from '@models/user';
import { NextResponse } from '@node_modules/next/server';
import { connectDB } from '@utils/database';
import Joi from 'joi';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const GET = async (req) => {
    const authResponse = auth(req);
    if(authResponse) {
        return authResponse;
    }

    try {
        await connectDB();
        const user = await User.findById(req.user.id).select('-password');
        return NextResponse.json({ user });
    } catch (error) {
        console.error(error);
        return NextResponse.json([{message: 'Server Error'}], { status: 500 });
    }
};

const schema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': `email must be a valid email`,
        'any.required': `email is a required field`
    }),
    password: Joi.string().required().messages({
        'any.required': `password is a required field`
    })
});

const signJwt = (payload, secret, options) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, secret, options, (err, token) => {
            if (err) {
                reject(err);
            } else {
                resolve(token);
            }
        });
    });
};

export const POST = async (req, res) => {
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

    const { email, password } = body;

    try {
        await connectDB();
        let user = await User.findOne({ email });

        if(!user) {
            return NextResponse.json(
                [{ message: "Invalid Credentials!" }],
                { status: 400 }
            );
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return NextResponse.json(
                [{ message: "Invalid Credentials!" }],
                { status: 400 }
            );
        }

        const payload = {
            user: {
                id: user.id
            }
        };
        const token = await signJwt(payload, process.env.JWT_SECRET, { expiresIn: 360000 });

        return NextResponse.json({ token }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            [{ message: "Server Error." }],
            { status: 500 }
        );
    }
};