import axios from "axios";
import base_url from "../BaseUrl";

export default async function banUser(user_id) {
	return axios({
		method: "get",
		url: `${base_url}customer/ban/${user_id}`,
		headers: { Authorization: localStorage.getItem("token") },
	})
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			return err.response;
		});
}
