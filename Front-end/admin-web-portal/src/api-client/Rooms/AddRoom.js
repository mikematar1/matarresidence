import axios from "axios";
import base_url from "../BaseUrl";

export default async function AddRoom(data) {
	const resp = await axios
		.post(`${base_url}room/add`, data, {
			headers: { Authorization: localStorage.getItem("token") },
		})
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			return err.response;
		});
	return resp;
}
