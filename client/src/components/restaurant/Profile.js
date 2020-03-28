import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import ProfileTop from "./ProfileTop";
import Product from "./Product";
import { Link } from "react-router-dom";
import { getRestaurantProfileById } from "../../actions/restaurant";
import Cart from "../cart/Cart";
const Profile = ({
  getRestaurantProfileById,
  profile: { profile, loading },

  match
}) => {
  const nullProfile = !profile;
  useEffect(() => {
    getRestaurantProfileById(match.params.id);
  }, [getRestaurantProfileById, match.params.id, nullProfile]);

  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/restaurants">Bsck to restaurants</Link>
        </Fragment>
      )}
      <div className="profile-grid my-1">
        <ProfileTop profile={profile} />
        <Product />
        <Cart />
      </div>
    </Fragment>
  );
};

Profile.propTypes = {
  getRestaurantProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getRestaurantProfileById })(Profile);
