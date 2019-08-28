import React from 'react';
import PropTypes from 'prop-types';
import data from '../../data';
import './plane.scss';

export const Plane = () => {
	const business = data.plane.business.map((item, i) => {
		const leftSide = item
			.filter((seat, index) => {
				return index < 2;
			})
			.map(seat => {
				const seatNum = `${i + 1}${seat}`;
				return (
					<li className="seat business" key={seatNum}>
						{seatNum}
					</li>
				);
			});

		const rightSide = item
			.filter((seat, index) => {
				return index >= 2;
			})
			.map(seat => {
				const seatNum = `${i + 1}${seat}`;
				console.log(seatNum);

				return (
					<li className="seat business" key={seatNum}>
						{seatNum}
					</li>
				);
			});

		return (
			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<div className="row">
					<ol className="seats">{leftSide}</ol>
				</div>
				<div className="row">
					<ol className="seats">{rightSide}</ol>
				</div>
			</div>
		);
	});

	const economy = data.plane.economy.map((item, i) => {
		const row = item.map(seat => {
			const seatNum = `${data.plane.business.length + i + 1}${seat}`;
			return (
				<li className="seat" key={seatNum}>
					{data.plane.business.length + 1 + i}
					{seat}
				</li>
			);
		});
		return (
			<li className="row">
				<ol className="seats">{row}</ol>
			</li>
		);
	});
	const plane = [...business, ...economy];
	return (
		// <div>
		<ol className="plane">{plane}</ol>
		// </div>
	);
};
export default Plane;
