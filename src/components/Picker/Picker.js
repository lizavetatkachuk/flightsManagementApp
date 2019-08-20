import React from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
export class Picker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }
  handleChange = date => {
    const local = moment(date)
      .local()
      .format("YYYY-MM-DD HH:mm:ss");
    this.setState({ date });
    this.props.input.onChange(date);
  };
  render() {
    const { touched, error } = this.props.meta;
    const { name, onChange } = this.props.input;
    const date = this.state.date;
    const title = this.name === "there" ? "Fly there" : "Fly back";
    return (
      <div className="select-area">
        <label className="search-form__label">{title}</label>
        {this.error && this.touched && (
          <span className="error">{this.error}</span>
        )}
        <DatePicker
          selected={date}
          onChange={date => this.handleChange(date)}
          errorText={touched && error}
          dateFormat="MMMM d, yyyy"
        />
      </div>
    );
  }
}
