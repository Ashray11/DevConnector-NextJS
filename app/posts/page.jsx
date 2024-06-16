"use client";

import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPosts } from "@redux/actions/post";
import Spinner from "@components/layout/Spinner";
import PostItem from "@components/post/PostItem";
import Alert from "@components/layout/Alert";
import PostForm from "@components/post/PostForm";

const Posts = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <Fragment>
      <section className="container">
        <Alert />
        {loading ? (
          <Spinner />
        ) : (
          <Fragment>
            <h1 className="large text-primary">Posts</h1>
            <p className="lead">
              <i className="fas fa-user"></i> Welcome to the community!
            </p>
            <PostForm />
            <div className="posts">
              {posts.map((post) => (
                <PostItem key={post._id} post={post} />
              ))}
            </div>
          </Fragment>
        )}
      </section>
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPosts })(Posts);
