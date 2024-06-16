import React from "react";
import PropTypes from "prop-types";
import formatDate from "@utils/formatDate";

const ProfileExperience = ({
  experience: { company, title, from, to, current, description },
}) => {
  return (
    <div>
      <h3 className="text-dark">{company}</h3>
      <p>
        {formatDate(from)} - {to ? formatDate(to) : "Now"}
      </p>
      <p>
        <strong>Position: </strong>
        {title}
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

ProfileExperience.propTypes = {
  experience: PropTypes.object.isRequired,
};

export default ProfileExperience;
