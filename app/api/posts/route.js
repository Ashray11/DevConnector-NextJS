import { NextResponse } from "@node_modules/next/server";
import auth from "@middlewares/auth";
import User from "@models/user";
import Post from "@models/post";
import Joi from 'joi';

const schema = Joi.object({
    text: Joi.string().required().messages({
        'any.required': `text is a required field`
    })
});

export const POST = async (req) => {
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

    try {
        const user = await User.findById(req.user.id).select('-password');

        const newPost = new Post({
            text: body.text, 
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        });

        const post = await newPost.save();

        return NextResponse.json(post, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Server Error." }, { status: 500 });
    }
};

export const GET = async (req) => {
    const authResponse = auth(req);
    if(authResponse) {
        return authResponse;
    }

    try {
        const posts = await Post.find().sort({ date: -1 });
        return NextResponse.json(posts, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Server Error." }, { status: 500 });
    }
};