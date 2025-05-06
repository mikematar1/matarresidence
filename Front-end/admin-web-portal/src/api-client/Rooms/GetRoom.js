import axios from "axios";
import base_url from "../BaseUrl";

export default async function GetRoom() {
	const resp = await axios
		.get(`${base_url}room/get`, {
			headers: { Authorization: localStorage.getItem("token") },
		})
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			return err;
		});
	return resp;
}
