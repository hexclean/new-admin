import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import ProductItem from "./ProductItem";
import { getRestaurantProductById } from "../../actions/restaurant";
import { useParams } from "react-router-dom";
const Product = ({
  getRestaurantProductById,
  product: { products, loading }
}) => {
  let { id } = useParams();
  useEffect(() => {
    getRestaurantProductById(id);
  }, [getRestaurantProductById]);
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">product</h1>
      <p className="lead">
        <i className="fas fa-user"></i>Welcome to product page
      </p>
      {/*RestaurantForm*/}
      <div className="posts">
        {products.map(product => (
          <ProductItem key={product._id} product={product} />
        ))}
      </div>
    </Fragment>
  );
};

Product.propTypes = {
  getRestaurantProductById: PropTypes.func.isRequired
  // post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  product: state.product
});

export default connect(mapStateToProps, { getRestaurantProductById })(Product);
