import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Spinner from "@components/layout/Spinner";
import { connect } from "react-redux";
import { getRepos } from "@redux/actions/profile";

const ProfileGithub = ({ username, getRepos, repos }) => {
  useEffect(() => {
    getRepos(username);
  }, [getRepos, username]);

  return (
    <div className="profile-github">
      <h2 className="text-primary my-1">
        <i className="fab fa-github"></i> Github Repos
      </h2>
      {repos === null ? (
        <Spinner />
      ) : (
        repos.map((repo) => (
          <div key={repo._id} className="repo bg-white p-1 my-1">
            <div>
              <h4>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer">
                  {repo.name}
                </a>
              </h4>
              <p>{repo.description}</p>
            </div>
            <div>
              <ul>
                <li className="badge badge-primary" style={{ padding: "4px" }}>
                  Stars: {repo.stargazers_count}
                </li>
                <li className="badge badge-dark" style={{ padding: "8px" }}>
                  Watchers: {repo.watchers_count}
                </li>
                <li className="badge badge-light" style={{ padding: "4px" }}>
                  Forks: {repo.forks_count}
                </li>
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired,
  getRepos: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  repos: state.profile.repos,
});

export default connect(mapStateToProps, { getRepos })(ProfileGithub);
