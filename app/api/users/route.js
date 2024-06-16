import Joi from 'joi';
import { NextResponse } from 'next/server';
import User from '@models/user';
import gravatar from 'gravatar';
import bcrypt from 'bcryptjs';
import { connectDB } from '@utils/database';
import jwt from 'jsonwebtoken';

const schema = Joi.object({
    name: Joi.string().min(1).required().messages({
        'string.base': `name should be a type of 'text'`,
        'string.empty': `name cannot be an empty field`,
        'any.required': `name is a required field`
    }),
    email: Joi.string().email().required().messages({
        'string.email': `email must be a valid email`,
        'any.required': `email is a required field`
    }),
    password: Joi.string().min(6).required().messages({
        'string.min': `password should have a minimum length of {#limit}`,
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

export const POST = async (req) => {
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

    const { name, email, password } = body;

    try {
        await connectDB();
        let user = await User.findOne({ email });

        if(user) {
            return NextResponse.json(
                [{ message: "User Already Exists!" }],
                { status: 400 }
            );
        }

        const avatar = gravatar.url(email, {
            s: '200', // size
            r: 'pg',  // rating
            d: 'mm'   // default image
        });
        
        user = new User({
            name, email, password, avatar
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

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