import React, { Fragment, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addDeliveryAdress } from "../../actions/profile";

const AddDeliveryAdress = ({ addDeliveryAdress, history }) => {
  const [formData, setFormData] = useState({
    street: "",
    houseNumber: "",
    blok: "",
    apartament: "",
    other: "",
    phoneNumber: ""
  });
  const {
    street,
    houseNumber,
    blok,
    apartament,
    other,
    phoneNumber
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      {" "}
      <h1 class="large text-primary">Add An Experience</h1>
      <p class="lead">
        <i class="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form
        class="form"
        onSubmit={e => {
          e.preventDefault();
          addDeliveryAdress(formData, history);
        }}
      >
        <div class="form-group">
          <input
            type="text"
            placeholder="* street"
            name="street"
            value={street}
            onChange={e => onChange(e)}
          />
        </div>
        <div class="form-group">
          <input
            type="text"
            placeholder="houseNumber"
            name="houseNumber"
            value={houseNumber}
            onChange={e => onChange(e)}
          />
        </div>
        <div class="form-group">
          <input
            type="text"
            placeholder="blok"
            name="blok"
            value={blok}
            onChange={e => onChange(e)}
          />
        </div>
        <div class="form-group">
          <input
            type="text"
            placeholder="apartament"
            name="apartament"
            value={apartament}
            onChange={e => onChange(e)}
          />
        </div>
        <div class="form-group">
          <input
            type="text"
            placeholder="other"
            name="other"
            value={other}
            onChange={e => onChange(e)}
          />
        </div>
        <div class="form-group">
          <input
            type="text"
            placeholder="phoneNumber"
            name="phoneNumber"
            value={phoneNumber}
            onChange={e => onChange(e)}
          />
        </div>

        <input type="submit" class="btn btn-primary my-1" />
        <Link class="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

AddDeliveryAdress.propTypes = {
  addDeliveryAdress: PropTypes.func.isRequired
};

export default connect(null, { addDeliveryAdress })(AddDeliveryAdress);
