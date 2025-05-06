import axios from "axios";
import base_url from "../BaseUrl";

export default async function Logout() {
	return axios
		.get(`${base_url}auth/logout`, {
			headers: { Authorization: localStorage.getItem("token") },
		})
		.then((res) => {
			localStorage.removeItem("token");
			return res.data;
		})
		.catch((err) => {
			return err;
		});
}
