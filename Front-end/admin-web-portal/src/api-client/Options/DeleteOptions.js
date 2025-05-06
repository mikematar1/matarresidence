import axios from "axios";
import base_url from "../BaseUrl";

export default async function DeleteOption(option_id, tag) {
	let url = base_url;
	if (tag === "faq") {
		url += `faq/remove/${option_id}`;
	}
	if (tag === "policy") {
		url += `policy/remove/${option_id}`;
	}
	if (tag === "regulation") {
		url += `regulation/remove/${option_id}`;
	}
	if (tag === "disaster") {
		url += `response/remove/${option_id}`;
	}

	const response = await axios({
		method: "get",
		url: url,
		headers: { Authorization: localStorage.getItem("token") },
	})
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			return err.response;
		});
	return response;
}
