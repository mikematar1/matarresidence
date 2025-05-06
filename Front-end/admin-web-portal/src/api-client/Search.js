import axios from "axios";
import base_url from "./BaseUrl";

async function Search(query, type) {
	let url = `${base_url}staff/search/`;
	if (type === "customer") {
		url = `${base_url}customer/search/`;
	}
	if (type === "reservation") {
		url = `${base_url}room/reservation/search/`;
	}
	return await axios({
		method: "post",
		url: url,
		data: query,
		headers: {
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	})
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			return err.response;
		});
}

export default Search;
