"use client";

import React, { Fragment, useState } from "react";
import Link from "next/link";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addExperience } from "@redux/actions/profile";
import { useRouter } from "next/navigation";
import Alert from "@components/layout/Alert";

const AddExperience = ({ addExperience }) => {
  const router = useRouter();
  const [displayTo, toggleTo] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  const { title, company, location, from, to, current, description } = formData;

  const onChange = async (event) => {
    const { name, value } = event.target;
    setFormData((prevVal) => {
      return {
        ...prevVal,
        [name]: value,
      };
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    addExperience(formData, router);
  };

  return (
    <Fragment>
      <section className="container">
        <Alert />
        <h1 className="large text-primary">Add An Experience</h1>
        <p className="lead">
          <i className="fas fa-code-branch"></i> Add any developer/programming
          positions that you have had in the past
        </p>
        <small>* = required field</small>
        <form className="form" onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              placeholder="* Job Title"
              name="title"
              value={title}
              onChange={(event) => onChange(event)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="* Company"
              name="company"
              value={company}
              onChange={(event) => onChange(event)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Location"
              name="location"
              value={location}
              onChange={(event) => onChange(event)}
            />
          </div>
          <div className="form-group">
            <h4>From Date</h4>
            <input
              type="date"
              name="from"
              value={from}
              onChange={(event) => onChange(event)}
            />
          </div>
          <div className="form-group">
            <p>
              <input
                type="checkbox"
                name="current"
                value={current}
                onClick={() => {
                  toggleTo(!displayTo);
                  setFormData({ ...formData, current: !current });
                }}
              />{" "}
              Current Job
            </p>
          </div>
          {!displayTo && (
            <div className="form-group">
              <h4>To Date</h4>
              <input
                type="date"
                name="to"
                value={to}
                onChange={(event) => onChange(event)}
              />
            </div>
          )}
          <div className="form-group">
            <textarea
              name="description"
              cols="30"
              rows="5"
              placeholder="Job Description"
              value={description}
              onChange={(event) => onChange(event)}></textarea>
          </div>
          <input type="submit" className="btn btn-primary my-1" />
          <Link className="btn btn-light my-1" href="/dashboard">
            Go Back
          </Link>
        </form>
      </section>
    </Fragment>
  );
};

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
};

export default connect(null, { addExperience })(AddExperience);
