import axios from "axios";
import base_url from "../BaseUrl";

export default async function DeleteRoom(room_id) {
	const resp = await axios
		.get(`${base_url}room/remove/${room_id}`, {
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
