import axios from "axios";
import base_url from "../../urban-boutique-hotel/src/BaseUrl";

export default async function addEmployee(data) {
	return axios
		.post(`${base_url}staff/add`, data, {
			headers: {
				Authorization: localStorage.getItem("token"),
			},
		})
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			return err.response;
		});
}
