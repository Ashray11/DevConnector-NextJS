import auth from "@middlewares/auth";
import { NextResponse } from "@node_modules/next/server";
import Post from "@models/post";

export const DELETE = async (req, { params }) => {
    const authResponse = auth(req);
    if(authResponse) {
        return authResponse;
    }

    try {
        const post = await Post.findById(params.post_id);
        const comment = post.comments.find(comment => comment.id.toString() === params.comment_id);
        console.log(post.comments[0].id, params.comment_id);

        if(!comment) {
            return NextResponse.json({ message: "Comment does not exist." }, { status: 404 });
        }

        if(comment.user.toString() !== req.user.id) {
            return NextResponse.json({ message: "User not authorized." }, { status: 200 });
        }

        post.comments = post.comments.filter(comment => comment.id.toString() !== params.comment_id); 
        
        await post.save();

        return NextResponse.json(post.comments, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Server Error." }, { status: 500 });
    }
};