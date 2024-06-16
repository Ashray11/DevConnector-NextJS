"use client";

import { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useRouter } from "next/navigation";
import { deleteAccount, getCurrentProfile } from "@redux/actions/profile";
import Spinner from "@components/layout/Spinner";
import Link from "next/link";
import Alert from "@components/layout/Alert";
import Experience from "@components/layout/Experience";
import Education from "@components/layout/Education";

const Dashboard = ({ auth, getCurrentProfile, deleteAccount, profile }) => {
  const router = useRouter();

  useEffect(() => {
    if (!auth.loading && !auth.isAuthenticated) {
      router.push("/login");
    }
  }, [auth, router]);

  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  if (auth.loading || !auth.isAuthenticated) {
    return null;
  }

  return (
    <section className="container">
      <Alert />
      {profile.loading && profile.profile === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Dashboard</h1>
          <p className="lead">
            <i className="fas fa-user" /> Welcome {auth.user && auth.user.name}
          </p>

          {profile.profile === null ? (
            <Fragment>
              <p>
                You have not yet setup a profile, please add some information...
              </p>
              <Link href="/create-profile" className="btn btn-primary my-1">
                Create Profile
              </Link>
            </Fragment>
          ) : (
            <Fragment>
              <div className="dash-buttons">
                <Link href="/edit-profile" className="btn btn-light">
                  <i className="fas fa-user-circle text-primary"></i> Edit
                  Profile
                </Link>
                <Link href="/add-experience" className="btn btn-light">
                  <i className="fab fa-black-tie text-primary"></i> Add
                  Experience
                </Link>
                <Link href="/add-education" className="btn btn-light">
                  <i className="fas fa-graduation-cap text-primary"></i> Add
                  Education
                </Link>
              </div>

              <Experience experience={profile.profile.experience} />
              <Education education={profile.profile.education} />

              <div className="my-2">
                <button className="btn btn-danger" onClick={deleteAccount}>
                  <i className="fas fa-user-minus fa-fw"></i> Delete My Account
                </button>
              </div>
            </Fragment>
          )}
        </Fragment>
      )}
    </section>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard,
);
