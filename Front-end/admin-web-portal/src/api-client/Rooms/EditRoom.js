import axios from "axios";
import base_url from "../BaseUrl";

export default async function EditRoom(data) {
	const room = await axios({
		method: "post",
		url: `${base_url}room/edit`,
		data: data,
		headers: {
			Authorization: "Bearer " + localStorage.getItem("token"),
		},
	})
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			return err;
		});
	const images = await axios({
		method: "post",
		url: `${base_url}room/images/edit`,
		data: data,
		headers: {
			Authorization: "Bearer " + localStorage.getItem("token"),
		},
	})
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			return err;
		});

	return [room, images];
}
