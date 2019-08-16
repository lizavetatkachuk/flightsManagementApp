import React from "react";
import { Form, Field } from "react-final-form";
import "./searchForm.scss";
import { validate, onSubmit } from "../../validators";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import Directions from "./Directions";
import pic from "./../../static/images/arrows.svg";
import Button from "./../Shared/Button/Button";
import cities from "./../../data";
class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date()
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange = a => a;
  render() {
    return (
      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={() => (
          <div className="search-form">
            <div className="search-form__search-field">
              <label>Flying From</label>
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
              <label>Flying to</label>
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
              <label>
                <Field
                  name="return"
                  component="input"
                  type="radio"
                  value="one-way"
                />{" "}
                One Way
              </label>
              <label>
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
                  selected={this.state.startDate}
                  onChange={this.handleChange}
                />
              </div>
              <div className="component flight-dates">
                <p> Fly back</p>
                <DatePicker
                  selected={this.state.startDate}
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
          </div>
        )}
      />
    );
  }
}

export default SearchForm;
