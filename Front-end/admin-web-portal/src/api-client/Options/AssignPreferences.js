import axios from "axios";
import base_url from "../BaseUrl";

const AssignPreferences = async (reqData) => {
	let languages = "Success";
	let currencies = "Success";
	let paymentMethods = "Success";

	if (reqData.languages) {
		languages = await axios({
			method: "post",
			url: `${base_url}language/select`,
			data: {
				selections: reqData.languages,
			},
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		})
			.then((res) => {
				return res.data;
			})
			.catch((err) => {
				return err.response;
			});
	}
	if (reqData.currencies) {
		currencies = await axios({
			method: "post",
			url: `${base_url}currency/select`,
			data: {
				selections: reqData.currencies,
			},
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		})
			.then((res) => {
				return res.data;
			})
			.catch((err) => {
				return err.response;
			});
	}
	if (reqData.payment_methods) {
		paymentMethods = await axios({
			method: "post",
			url: `${base_url}payment/select`,
			data: {
				selections: reqData.payment_methods,
			},
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		})
			.then((res) => {
				return res.data;
			})
			.catch((err) => {
				return err.response;
			});
	}

	return [languages, currencies, paymentMethods];
};

export default AssignPreferences;
