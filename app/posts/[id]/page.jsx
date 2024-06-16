"use client";

import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPost } from "@redux/actions/post";
import Spinner from "@components/layout/Spinner";
import Alert from "@components/layout/Alert";
import PostItem from "@components/post/PostItem";
import Link from "next/link";
import CommentForm from "@components/post/CommentForm";
import CommentItem from "@components/post/CommentItem";

const Post = ({ params, getPost, post: { post, loading } }) => {
  const id = params?.id;
  useEffect(() => {
    getPost(id);
  }, [getPost, id]);

  return (
    <Fragment>
      <section className="container">
        <Alert />
        {loading || post === null ? (
          <Spinner />
        ) : (
          <Fragment>
            <Link href="/posts" className="btn">
              Back to Posts
            </Link>
            <PostItem post={post} showActions={false} />
            <CommentForm postId={post._id} />
            <div className="comments">
              {post.comments.map((comment) => (
                <CommentItem
                  key={comment._id}
                  comment={comment}
                  postId={post._id}
                />
              ))}
            </div>
          </Fragment>
        )}
      </section>
    </Fragment>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPost })(Post);
