import axios from "axios";
import base_url from "../BaseUrl";

export default async function deleteEmployee(user_id) {
	return axios({
		method: "get",
		url: `${base_url}staff/ban/${user_id}`,
		headers: { Authorization: localStorage.getItem("token") },
	})
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			return err.response;
		});
}
