import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, Field } from 'react-final-form';
import { withRouter } from 'react-router-dom';
import { getFlights } from './../../redux/actions/getFlights';
import Button from './../Shared/Button/Button';
import { Picker } from './../Picker/Picker';
import { validateDate } from '../../validators';
import data from './../../data';
import pic from './../../static/images/arrows.svg';
import './searchForm.scss';

class SearchForm extends React.Component {
	filter = data => {
		const flights = data.Quotes.map(item => {
			const companies = item.OutboundLeg.CarrierIds.map(company => {
				const name = data.Carriers.find(carrier => {
					const result = carrier.CarrierId === company;
					return result;
				});
				return name.Name;
			});
			const flight = {
				price: item.MinPrice,
				time: item.OutboundLeg.DepartureDate,
				companies: companies
			};
			return flight;
		});
		return flights;
	};
	onSubmit = values => {
		this.props.getFlights(values);
		this.props.history.push('/flights');
	};
	directions = data.cities.map(city => (
		<option key={Object.keys(city)} value={Object.keys(city)}>
			{Object.values(city)}
		</option>
	));
	render() {
		console.log(this.props.flights);

		return (
			<Form
				onSubmit={this.onSubmit}
				validate={values => {
					const errors = {};
					if (!values.from) {
						errors.from = 'Choose the airport';
					}
					if (!values.to) {
						errors.to = 'Choose the destination';
					}
					if (!values.return) {
						errors.return = 'Choose the flight type';
					}
					if (!values.there) {
						errors.there = 'Choose the dates';
					}
					if (!values.back && values.return === 'return') {
						errors.back = 'Choose the dates';
					}
					return errors;
				}}
				render={({ handleSubmit, submitting, pristine }) => (
					<form
						className="search-form"
						onSubmit={e => {
							e.preventDefault();
							handleSubmit();
						}}
					>
						<div className="search-form__field">
							<Field
								name="from"
								render={({ input, meta }) => (
									<React.Fragment>
										<div className="container">
											<label className="search-form__label">Flying From</label>
											<select className="search-form__select " {...input}>
												{this.directions}
											</select>
											{meta.error && meta.touched && <span className="error">{meta.error}</span>}
										</div>
									</React.Fragment>
								)}
							/>
							<div className="search-form__select">
								<img src={pic} className="shift-btn" alt="arrow" />
							</div>

							<Field
								name="to"
								render={({ input, meta }) => (
									<React.Fragment>
										<div className="container">
											<label className="search-form__label">Flying To</label>

											<select className="search-form__select" {...input}>
												{this.directions}
											</select>
											{meta.error && meta.touched && <span className="error">{meta.error}</span>}
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
										<input {...input} />
										{meta.error && meta.touched && <span className="error">{meta.error}</span>}
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

										<input {...input} />
									</div>
								)}
							/>
						</div>
						<div className="search-form__field">
							<Field
								className="component flight-dates"
								component={Picker}
								validate={validateDate}
								name="there"
							/>
							<Field
								className="component flight-dates"
								component={Picker}
								validate={validateDate}
								name="back"
							/>
						</div>
						<Button btnype="submit" disabled={submitting || pristine}>
							Search Flights
						</Button>
					</form>
				)}
			/>
		);
	}
}
SearchForm.propTypes = {
	history: PropTypes.object.isRequired,
	location: PropTypes.object.isRequired,
	match: PropTypes.object.isRequired
};

const mapStateToProps = state => {
	return { flights: state.flights };
};

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			getFlights
		},
		dispatch
	);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(SearchForm));
