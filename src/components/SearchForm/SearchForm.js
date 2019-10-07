import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Form, Field } from "react-final-form";
import { withRouter } from "react-router-dom";
import { requestFlights } from "./../../redux/actions/flights";
import Button from "./../Shared/Button/Button";
import { Picker } from "./../Picker/Picker";
import { validateDate } from "../../validators";
import { api } from "./../../helpers/apiHeler";
import pic from "./../../static/images/arrows.svg";
import "./searchForm.scss";

class SearchForm extends React.Component {
  componentDidMount() {
    api.get("/admin/airports").then(res => {
      const cities = res.data;
      this.setState(state => ({ cities: cities }));
    });
  }

  state = {
    cities: []
  };

  render() {
    const { requestFlights, history, error } = this.props;

    const onSubmit = values => {
      requestFlights({ ...values, history });
    };

    const directions = this.state.cities ? (
      this.state.cities.map(city => (
        <option key={city.code} value={city._id}>
          {city.name}
        </option>
      ))
    ) : (
      <option key="empty"></option>
    );

    return (
      <Form
        onSubmit={onSubmit}
        initialValues={{ return: "one-way" }}
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
          <div className="form-container">
            <form className="search-form" onSubmit={handleSubmit}>
              <div className="search-form__field">
                <Field
                  name="from"
                  render={({ input, meta }) => (
                    <React.Fragment>
                      <div className="input-container--vertical">
                        <label className="search-form__label">
                          Flying From
                        </label>
                        <select
                          className="search-form__select "
                          {...input}
                          placeholder="Choose the airport"
                        >
                          <option
                            key="empty-destination"
                            value=""
                            disabled
                            hidden
                          >
                            Choose the airport
                          </option>
                          {directions}
                        </select>
                        <span className="error">
                          {meta.error && meta.touched ? meta.error : ""}
                        </span>
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
                      <div className="input-container--vertical">
                        <label className="search-form__label">Flying To</label>
                        <select className="search-form__select" {...input}>
                          <option
                            key="empty-destination"
                            value=""
                            disabled
                            hidden
                          >
                            Choose the airport
                          </option>
                          {directions}
                        </select>
                        <span className="error">
                          {meta.error && meta.touched ? meta.error : ""}
                        </span>
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
                    <div className="input-container">
                      <label
                        htmlFor="one-way"
                        className="search-form__label radio-container"
                      >
                        One Way
                        <input
                          className="radio-container__radio"
                          id="one-way"
                          {...input}
                        />
                        <span className="radio-container__circle"></span>
                      </label>
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
                    <div className="input-container">
                      <label
                        htmlFor="return"
                        className="search-form__label radio-container"
                      >
                        Return
                        <input
                          className="radio-container__radio"
                          id="return"
                          {...input}
                        />
                        <span className="radio-container__circle"></span>
                      </label>
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
                {error ? (
                  <p className="server-error">
                    There are no flights for these dates
                  </p>
                ) : (
                  <p className="server-error"></p>
                )}
              </div>{" "}
              <Button
                btnype="submit"
                btnclass="search-flights-btn"
                disabled={submitting || pristine}
              >
                Search
              </Button>
            </form>
          </div>
        )}
      />
    );
  }
}

SearchForm.propTypes = {
  requestFlights: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      requestFlights
    },
    dispatch
  );

const mapStateToProps = state => {
  return { error: state.flights.error };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SearchForm));
