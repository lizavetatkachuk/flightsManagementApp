import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Form, Field } from "react-final-form";
import { withRouter } from "react-router-dom";
import { getFlights } from "./../../redux/actions/flights";
import Button from "./../Shared/Button/Button";
import { Picker } from "./../Picker/Picker";
import { validateDate } from "../../validators";
import data from "./../../data";
import pic from "./../../static/images/arrows.svg";
import "./searchForm.scss";

class SearchForm extends React.Component {
  render() {
    const { getFlights, history } = this.props;
    const onSubmit = values => {
      getFlights(values);
      history.push("/flights");
    };
    const directions = data.cities.map(city => (
      <option key={Object.keys(city)} value={Object.keys(city)}>
        {Object.values(city)}
      </option>
    ));
    return (
      <Form
        onSubmit={onSubmit}
        validate={values => {
          const errors = {};
          if (!values.from) {
            errors.from = "Choose the airport";
          }
          if (!values.to) {
            errors.to = "Choose the destination";
          }
          if (!values.return) {
            errors.return = "Choose the flight type";
          }
          if (!values.there) {
            errors.there = "Choose the dates";
          }
          if (!values.back && values.return === "return") {
            errors.back = "Choose the dates";
          }
          return errors;
        }}
        render={({ handleSubmit, submitting, pristine }) => (
          <form className="search-form" onSubmit={handleSubmit}>
            <div className="search-form__field">
              <Field
                name="from"
                render={({ input, meta }) => (
                  <React.Fragment>
                    <div className="container--vertical">
                      <label className="search-form__label">Flying From</label>
                      <select className="search-form__select " {...input}>
                        {directions}
                      </select>
                      {meta.error && meta.touched && (
                        <span className="error">{meta.error}</span>
                      )}
                    </div>
                  </React.Fragment>
                )}
              />
              <div>
                <img src={pic} className="shift-btn" alt="arrow" />
              </div>

              <Field
                name="to"
                render={({ input, meta }) => (
                  <React.Fragment>
                    <div className="container--vertical">
                      <label className="search-form__label">Flying To</label>
                      <select className="search-form__select" {...input}>
                        {directions}
                      </select>
                      {meta.error && meta.touched && (
                        <span className="error">{meta.error}</span>
                      )}
                    </div>
                  </React.Fragment>
                )}
              />
            </div>
            <div className="search-form__field there-and-back">
              <Field
                name="return"
                value="one-way"
                type="radio"
                render={({ input, meta }) => (
                  <div className="container">
                    <label className="search-form__label">One Way</label>
                    <input className="radio" {...input} />
                    {meta.error && meta.touched && (
                      <span className="error">{meta.error}</span>
                    )}
                  </div>
                )}
              />

              <Field
                name="return"
                value="return"
                type="radio"
                render={({ input, meta }) => (
                  <div className="container">
                    <label className="search-form__label">Return</label>
                    <input className="radio" {...input} />
                  </div>
                )}
              />
            </div>
            <div className="search-form__field">
              <Field
                className="flight-dates"
                component={Picker}
                validate={validateDate}
                name="there"
              />
              <Field
                className="flight-dates"
                component={Picker}
                validate={validateDate}
                name="back"
              />
            </div>
            <Button
              btnype="submit"
              btnclass="search-flights-btn"
              disabled={submitting || pristine}
            >
              Search Flights
            </Button>
          </form>
        )}
      />
    );
  }
}
SearchForm.propTypes = {
  getFlights: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getFlights
    },
    dispatch
  );

export default connect(
  null,
  mapDispatchToProps
)(withRouter(SearchForm));
