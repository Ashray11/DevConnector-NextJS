import auth from "@middlewares/auth";
import Post from "@models/post";
import { NextResponse } from "@node_modules/next/server";

export const GET = async (req, { params }) => {
    const authResponse = auth(req);
    if(authResponse) {
        return authResponse;
    }

    try {
        const post = await Post.findById(params.post_id);

        if(!post) {
            return NextResponse.json({ message: "Post not found." }, { status: 404 });
        }

        return NextResponse.json(post, { status: 200 });
    } catch (error) {
        console.error(error);
        if(error.kind === 'ObjectId') {
            return NextResponse.json({ message: "Post not found." }, { status: 404 });
        }
        return NextResponse.json({ error: "Server Error." }, { status: 500 });
    }
};

export const DELETE = async (req, { params }) => {
    const authResponse = auth(req);
    if(authResponse) {
        return authResponse;
    }

    try {
        const post = await Post.findById(params.post_id);

        if(!post) {
            return NextResponse.json({ message: "Post not found." }, { status: 404 });
        }

        if(post.user.toString() !== req.user.id) {
            return NextResponse.json({ message: "User not authorized." }, { status: 401 });
        }

        await Post.deleteOne({ _id: params.post_id });

        return NextResponse.json({ message: "Post removed." }, { status: 200 });
    } catch (error) {
        console.error(error);
        if(error.kind === 'ObjectId') {
            return NextResponse.json({ message: "Post not found." }, { status: 404 });
        }
        return NextResponse.json({ error: "Server Error." }, { status: 500 });
    }
};