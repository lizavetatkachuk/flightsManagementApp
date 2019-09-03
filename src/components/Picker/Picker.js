import React from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

export class Picker extends React.Component {
  state = { date: new Date() };
  handleChange = date => {
    const local = moment(date)
      .local()
      .format("YYYY-MM-DD");
    this.setState({ date });
    this.props.input.onChange(local);
  };
  render() {
    const { touched, error } = this.props.meta;
    const { date } = this.state;
    const { name } = this.props.input;
    const title = name === "there" ? "Fly there" : "Fly back";

    return (
      <div className="container">
        <label className="search-form__label">{title}</label>
        <DatePicker
          selected={date}
          onChange={date => this.handleChange(date)}
          errorText={touched && error}
          dateFormat="MMMM d, yyyy"
        />
        {error && touched && <span className="error">{error}</span>}
      </div>
    );
  }
}
Picker.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired
};
