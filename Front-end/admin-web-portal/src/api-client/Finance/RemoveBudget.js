import axios from "axios";
import base_url from "../BaseUrl";

export default async function RemoveBudget(id) {
	return await axios({
		method: "get",
		url: `${base_url}budget/remove/${id}`,
		headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
	})
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			return err;
		});
}
