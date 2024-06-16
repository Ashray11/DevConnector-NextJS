import React from "react";
import PropTypes from "prop-types";
import formatDate from "@utils/formatDate";

const ProfileEducation = ({
  education: { school, degree, fieldofstudy, from, to, description },
}) => {
  return (
    <div>
      <h3 className="text-dark">{school}</h3>
      <p>
        {formatDate(from)} - {to ? formatDate(to) : "Now"}
      </p>
      <p>
        <strong>Degree: </strong>
        {degree}
      </p>
      <p>
        {fieldofstudy && (
          <span>
            <strong>Field of Study: </strong>
            {fieldofstudy}
          </span>
        )}
      </p>
      <p>
        {description && (
          <span>
            <strong>Description: </strong>
            {description}
          </span>
        )}
      </p>
    </div>
  );
};

ProfileEducation.propTypes = {
  education: PropTypes.object.isRequired,
};

export default ProfileEducation;
