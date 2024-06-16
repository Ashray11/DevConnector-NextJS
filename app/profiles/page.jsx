"use client";

import { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import Alert from "@components/layout/Alert";
import Spinner from "@components/layout/Spinner";
import { connect } from "react-redux";
import { getProfiles } from "@redux/actions/profile";
import ProfileItem from "@components/profile/ProfileItem";

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  return (
    <Fragment>
      <section className="container">
        <Alert />
        {loading ? (
          <Spinner />
        ) : (
          <Fragment>
            <h1 className="large text-primary">Developers</h1>
            <p className="lead">
              <i className="fa-brands fa-connectdevelop"></i> Browse and Connect
              with Developers
            </p>
            <div className="profiles">
              {profiles.length > 0 ? (
                profiles.map((profile) => (
                  <ProfileItem key={profile._id} profile={profile} />
                ))
              ) : (
                <h4>No profiles found...</h4>
              )}
            </div>
          </Fragment>
        )}
      </section>
    </Fragment>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
