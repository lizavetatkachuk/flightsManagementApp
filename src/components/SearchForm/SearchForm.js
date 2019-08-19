import React from "react";
import { Form, Field } from "react-final-form";
import DatePicker from "react-datepicker";
import moment from "moment";
import { withRouter } from "react-router-dom";
import Directions from "./Directions";
import Button from "./../Shared/Button/Button";
import cities from "./../../data";
import pic from "./../../static/images/arrows.svg";
import "./searchForm.scss";
import "react-datepicker/dist/react-datepicker.css";

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date()
    };
    const startDate = this.state.startDate;
  }

  handleChange = a => a;
  onSubmit = values => {
    console.log(`Form values: ${JSON.stringify(values, null, 4)}`);
    this.props.history.push("/flights");
  };
  render() {
    return (
      <Form
        onSubmit={this.onSubmit}
        // validate={validate}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form className="search-form" onSubmit={handleSubmit}>
            <div className="search-form__search-field">
              <label className="search-form__label">Flying From</label>
              <Field
                className="component direction"
                name="from"
                component="select"
                type="text"
              >
                <Directions props={cities} />
              </Field>
              <div className="component">
                <img src={pic} className="shift-btn" alt="arrow" />
              </div>
              <label className="search-form__label">Flying to</label>
              <Field
                className="component direction"
                name="to"
                component="select"
                type="text"
              >
                <Directions props={cities} />
              </Field>
            </div>
            <div className="search-form__search-field there-and-back">
              <label className="search-form__label">
                <Field
                  name="return"
                  component="input"
                  type="radio"
                  value="one-way"
                />{" "}
                One Way
              </label>
              <label className="search-form__label">
                <Field
                  name="return"
                  component="input"
                  type="radio"
                  value="return"
                />{" "}
                Return
              </label>
            </div>
            <div className="search-form__search-field">
              <div className="component flight-dates">
                <p> Fly there</p>
                <DatePicker
                  selected={this.startDate}
                  onChange={this.handleChange}
                />
              </div>
              <div className="component flight-dates">
                <p> Fly back</p>
                <DatePicker
                  selected={this.startDate}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <Button
              props={{
                type: "submit",
                className: "search-flights-btn",
                title: "Search Flights"
              }}
            />
          </form>
        )}
      />
    );
  }
}

export default withRouter(SearchForm);
