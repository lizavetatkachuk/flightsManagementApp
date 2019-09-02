import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken } from './../../helpers/authHelper';

const Order = () => {
	const [orders, setOrders] = useState(null);
	useEffect(() => {
		if (!orders) {
			const fetchData = async () => {
				const api = axios.create({
					baseURL: '/'
				});
				const data = await api.get('/flight', {
					headers: {
						Authorisation: getToken()
					}
				});
				setOrders(data.data);
			};
			fetchData();
		}
	});

	console.log(orders);
	return <h1>Hello</h1>;
};
export default Order;
