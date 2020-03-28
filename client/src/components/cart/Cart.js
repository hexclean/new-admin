import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { removeFromCart } from "../../actions/cart";
import { createOrder } from "../../actions/order";
class Cart extends Component {
  constructor(props) {
    super(props);
    // console.log(item.id); /// megnezi mi van benne
  }
  render() {
    const { cartItems } = this.props;
    // console.log(cartItems);

    return (
      <div className="alert alert-info">
        {cartItems.length === 0 ? (
          "Cart is empty"
        ) : (
          <div>
            You have {cartItems.length} items in the basket. <hr />
          </div>
        )}

        {cartItems.length > 0 && (
          <div>
            <ul>
              {cartItems.map(item => (
                <li key={item.id}>
                  <b>{item.title}</b>
                  <button
                    style={{ float: "right" }}
                    className="btn btn-danger btn-xs"
                    onClick={() =>
                      this.props.removeFromCart(this.props.cartItems, item)
                    }
                  >
                    X
                  </button>
                  <br />
                  {item.count} X {item.price}
                </li>
              ))}
            </ul>

            <b>Sum: {cartItems.reduce((a, c) => a + c.price * c.count, 0)}</b>
            <button
              onClick={() => this.props.createOrder(this.props.cartItems)}
              className="btn btn-primary"
            >
              checkout
            </button>
          </div>
        )}
      </div>
    );
  }
}
Cart.propTypes = {
  removeFromCart: PropTypes.func.isRequired,
  createOrder: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  cartItems: state.cart.items
});

export default connect(mapStateToProps, { removeFromCart, createOrder })(Cart);
