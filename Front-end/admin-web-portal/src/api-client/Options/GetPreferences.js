import axios from "axios";
import base_url from "../BaseUrl";

const GetPreferences = async () => {
	const languages = await axios({
		method: "get",
		url: base_url + "language/getall",
		headers: { Authorization: localStorage.getItem("token") },
	})
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			return err.response.data;
		});

	const currencies = await axios({
		method: "get",
		url: base_url + "currency/getall",
		headers: { Authorization: localStorage.getItem("token") },
	})
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			return err.response.data;
		});
	const payment_options = await axios({
		method: "get",
		url: base_url + "payment/getall",
		headers: { Authorization: localStorage.getItem("token") },
	})
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			return err.response.data;
		});

	return [languages, currencies, payment_options];
};

export default GetPreferences;
