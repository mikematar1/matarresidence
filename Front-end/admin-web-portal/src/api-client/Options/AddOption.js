import axios from "axios";
import base_url from "../BaseUrl";

const AddOption = async (data, tag) => {
	let url = base_url;
	if (tag === "faq") {
		url += "faq/add";
	}
	if (tag === "Policy") {
		url += "policy/add";
	}
	if (tag === "disaster") {
		url += "response/add";
	}
	if (tag === "regulation") {
		url += "regulation/add";
	}
	const response = await axios({
		method: "post",
		url: url,
		headers: { Authorization: localStorage.getItem("token") },
		data: data,
	})
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			return err.response.data;
		});
	return response;
};

export default AddOption;
