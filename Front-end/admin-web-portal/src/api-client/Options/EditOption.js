import axios from "axios";
import base_url from "../BaseUrl";

const EditOption = async (data, tag) => {
	let url = base_url;
	if (tag === "faq") url += `faq/edit/`;
	if (tag === "policy") url += `policy/edit/`;
	if (tag === "regulation") url += `regulation/edit/`;
	if (tag === "disaster") url += `disaster/edit/`;

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
			return err.response;
		});
	return response;
};

export default EditOption;
