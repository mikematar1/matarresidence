import axios from "axios";
import base_url from "../BaseUrl";

export default async function GetCounts() {
	const revenue = axios({
		method: "get",
		url: `${base_url}room/reservation/getrevenue`,
		headers: { Authorization: localStorage.getItem("token") },
	})
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			return err.response;
		});

	const reservations = axios({
		method: "get",
		url: `${base_url}room/reservation/getcount`,
		headers: { Authorization: localStorage.getItem("token") },
	})
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			return err.response;
		});

	const customers = axios({
		method: "get",
		url: `${base_url}customer/getcount`,
		headers: { Authorization: localStorage.getItem("token") },
	})
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			return err.response;
		});

	const rooms = axios({
		method: "get",
		url: `${base_url}room/getcount`,
		headers: { Authorization: localStorage.getItem("token") },
	})
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			return err.response;
		});

	const pending_maintenance = axios({
		method: "get",
		url: `${base_url}maintenance/get`,
		headers: { Authorization: localStorage.getItem("token") },
	})
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			return err.response;
		});

	return [reservations, customers, rooms, pending_maintenance, revenue];
}
