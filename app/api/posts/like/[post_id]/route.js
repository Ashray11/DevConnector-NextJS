import Post from "@models/post";
import { NextResponse } from "@node_modules/next/server";
import auth from "@middlewares/auth";

export const PUT = async (req, { params }) => {
    const authResponse = auth(req);
    if(authResponse) {
        return authResponse;
    }

    try {
        const post = await Post.findById(params.post_id);

        if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return NextResponse.json({ message: "Post already liked." }, { status: 400 }); 
        }

        post.likes.unshift({ user: req.user.id });
        await post.save();

        return NextResponse.json(post.likes, { status: 200 });
    } catch (error) {
        console.error(error);
        if(error.kind === 'ObjectId') {
            return NextResponse.json({ message: "Post not found." }, { status: 404 });
        }
        return NextResponse.json({ error: "Server Error." }, { status: 500 });
    }
};