import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addToCart } from "../../actions/cart";

const ProductItem = props => {
  if (props.product) {
    return (
      <div>
        <div className="card">
          <div className="card-body">
            <h1 className="card-title">{props.product.title}</h1>
            <h1 className="card-title">{props.product.category}</h1>

            <button
              className="btn btn-primary"
              onClick={() => props.addToCart(props.cartItems, props.product)}
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    );
  }
  return null;
};
ProductItem.propTypes = {
  addToCart: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired
};
const mapSateToProps = state => ({
  cartItems: state.cart.items
});
export default connect(mapSateToProps, { addToCart })(ProductItem);
