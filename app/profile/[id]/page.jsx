"use client";

import { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProfileById } from "@redux/actions/profile";
import Spinner from "@components/layout/Spinner";
import Link from "next/link";
import ProfileTop from "@components/profile/ProfileTop";
import ProfileAbout from "@components/profile/ProfileAbout";
import ProfileEducation from "@components/profile/ProfileEducation";
import ProfileExperience from "@components/profile/ProfileExperience";
import ProfileGithub from "@components/profile/ProfileGithub";

const Profile = ({
  params,
  getProfileById,
  profile: { profile, loading },
  auth,
}) => {
  const id = params?.id;
  useEffect(() => {
    getProfileById(id);
  }, [getProfileById, id]);

  return (
    <Fragment>
      <section className="container">
        {profile === null || loading ? (
          <Spinner />
        ) : (
          <Fragment>
            <Link href="/profiles" className="btn btn-white">
              Back to Profiles
            </Link>
            {auth.isAuthenticated &&
              !auth.loading &&
              auth.user._id === profile.user._id && (
                <Link href="/edit-profile" className="btn btn-dark">
                  Edit Profile
                </Link>
              )}
            <div className="profile-grid my-1">
              <ProfileTop profile={profile} />
              <ProfileAbout profile={profile} />
              <div className="profile-exp bg-white p-2">
                <h2 className="text-primary">Experience</h2>
                {profile.experience.length > 0 ? (
                  <Fragment>
                    {profile.experience.map((experience) => (
                      <ProfileExperience
                        key={experience._id}
                        experience={experience}
                      />
                    ))}
                  </Fragment>
                ) : (
                  <h4>No experience credentials...</h4>
                )}
              </div>
              <div className="profile-edu bg-white p-2">
                <h2 className="text-primary">Education</h2>
                {profile.education.length > 0 ? (
                  <Fragment>
                    {profile.education.map((education) => (
                      <ProfileEducation
                        key={education._id}
                        education={education}
                      />
                    ))}
                  </Fragment>
                ) : (
                  <h4>No education credentials...</h4>
                )}
              </div>
              {profile.githubusername && (
                <ProfileGithub username={profile.githubusername} />
              )}
            </div>
          </Fragment>
        )}
      </section>
    </Fragment>
  );
};

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getProfileById: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
