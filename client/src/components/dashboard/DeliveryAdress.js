import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import moment from "moment";
import { connect } from "react-redux";

const DeliveryAdress = ({ deliveryadress }) => {
  const deliveryAdress = deliveryadress.map(exp => (
    <tr key={exp._id}>
      <td>{exp.street}</td>

      <td>
        <button className="btn btn-danger">Delete</button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className="my-2">Experience Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>

            <th />
          </tr>
        </thead>
        <tbody>{deliveryAdress}</tbody>
      </table>
    </Fragment>
  );
};

DeliveryAdress.propTypes = {
  deliveryadress: PropTypes.array.isRequired
};

export default DeliveryAdress;
