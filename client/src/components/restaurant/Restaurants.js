import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import RestaurantItem from "./RestaurantItem";

import { getRestaurants } from "../../actions/restaurant";

const Restaurants = ({
  getRestaurants,
  restaurant: { restaurants, loading }
}) => {
  useEffect(() => {
    getRestaurants();
  }, [getRestaurants]);
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">restaurants</h1>
      <p className="lead">
        <i className="fas fa-user"></i>Welcome to restaurants page
      </p>
      {/*RestaurantForm*/}
      <div className="posts">
        {restaurants.map(restaurant => (
          <RestaurantItem key={restaurant._id} restaurant={restaurant} />
        ))}
      </div>
    </Fragment>
  );
};

Restaurants.propTypes = {
  getRestaurants: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  restaurant: state.restaurant
});

export default connect(mapStateToProps, { getRestaurants })(Restaurants);
