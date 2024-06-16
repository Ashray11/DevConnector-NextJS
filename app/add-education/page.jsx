"use client";

import { Fragment, useState } from "react";
import Link from "next/link";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addEducation } from "@redux/actions/profile";
import { useRouter } from "next/navigation";
import Alert from "@components/layout/Alert";

const AddEducation = ({ addEducation }) => {
  const router = useRouter();
  const [displayTo, toggleTo] = useState(false);

  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  const { school, degree, fieldofstudy, from, to, current, description } =
    formData;

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
    addEducation(formData, router);
  };

  return (
    <Fragment>
      <section className="container">
        <Alert />
        <h1 className="large text-primary">Add Your Education</h1>
        <p className="lead">
          <i className="fas fa-code-branch"></i> Add any school, bootcamp, etc
          that you have attended
        </p>
        <small>* = required field</small>
        <form className="form" onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              placeholder="* School or Bootcamp"
              name="school"
              value={school}
              onChange={(event) => onChange(event)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="* Degree or Certificate"
              name="degree"
              value={degree}
              onChange={(event) => onChange(event)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Field Of Study"
              name="fieldofstudy"
              value={fieldofstudy}
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
              Current School or Bootcamp
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
              placeholder="Program Description"
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

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
};

export default connect(null, { addEducation })(AddEducation);
