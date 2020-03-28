import React from "react";
import PropTypes from "prop-types";

const ProfileTop = ({ profile }) => {
  if (profile) {
    return (
      <div>
        <div>{profile.email}</div>
        <div>{profile.name}</div>
      </div>
    );
  }
  return null;
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileTop;
