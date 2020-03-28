import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import DashboardActions from "./DashboardActions";
import DeliveryAdress from "./DeliveryAdress";

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1>Welcome {user && user.name}</h1>
      <p>
        {profile !== null ? (
          <Fragment>
            <DashboardActions />
            <DeliveryAdress deliveryadress={profile.deliveryadress} />
          </Fragment>
        ) : (
          <Fragment>
            <p>You have not set up porfile. please add some info</p>
            <Link to="/create-profile">Create Profile</Link>
          </Fragment>
        )}
      </p>
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
