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

export const POST = async (req, { params }) => {
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
        const post = await Post.findById(params.post_id);

        const newComment = {
            text: body.text, 
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        };

        post.comments.unshift(newComment);
        await post.save();

        return NextResponse.json(post.comments, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Server Error." }, { status: 500 });
    }
};

