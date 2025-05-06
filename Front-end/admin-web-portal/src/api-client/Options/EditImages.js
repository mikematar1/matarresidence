import axios from "axios";
import base_url from "../BaseUrl";

export default async function GetImages(data) {
	const response = await axios({
		method: "post",
		url: `${base_url}gallery/edit`,
		data: data,
		headers: {
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	})
		.then((res) => {
			return res;
		})
		.catch((err) => {
			return err.response;
		});

	return response;
}
