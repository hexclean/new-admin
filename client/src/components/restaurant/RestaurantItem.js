import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const RestaurantItem = ({ restaurant: { _id, email, name } }) => {
  return (
    <div>
      <Link to={`/restaurant/${_id}`}>
        {email}
        <p>{name}</p>
      </Link>
    </div>
  );
};

RestaurantItem.propTypes = {
  restaurant: PropTypes.object.isRequired
};

// const mapSateToProps = state => ({
//   restaurant: p
// });

export default connect(null, {})(RestaurantItem);
