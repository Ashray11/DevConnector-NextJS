"use client";

import React, { Fragment, useState } from "react";
import Link from "next/link";
import { connect } from "react-redux";
import { setAlert } from "@redux/actions/alert";
import { register } from "@redux/actions/auth";
import PropTypes from "prop-types";
import { useRouter } from "next/navigation";
import Alert from "@components/layout/Alert";

const Register = ({ setAlert, register, isAuthenticated }) => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const handleChange = (e) => {
    return setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords do not match!", "danger");
    } else {
      register({ name, email, password });
    }
  };

  if (isAuthenticated) {
    router.push("/dashboard");
  }

  return (
    <Fragment>
      <section className="container">
        <Alert />
        <h1 className="large text-primary">Sign Up</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Create Your Account
        </p>
        <form
          className="form"
          action="create-profile.html"
          onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={handleChange}
              //required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={handleChange}
            />
            <small className="form-text">
              This site uses Gravatar so if you want a profile image, use a
              Gravatar email
            </small>
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              //minLength="6"
              value={password}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              name="password2"
              //minLength="6"
              value={password2}
              onChange={handleChange}
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Register" />
        </form>
        <p className="my-1">
          Already have an account?
          <Link href="/login">Sign In</Link>
        </p>
      </section>
    </Fragment>
  );
};

Register.PropTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
