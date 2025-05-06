import axios from "axios";
import base_url from "../BaseUrl";

export default async function Finance() {
	const budgets = await axios
		.get(`${base_url}budget/get`, {
			headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
		})
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			return err;
		});
	return budgets;
}
