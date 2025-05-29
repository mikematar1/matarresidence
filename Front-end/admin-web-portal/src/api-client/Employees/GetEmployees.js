import axios from "axios";
import base_url from "../../urban-boutique-hotel/src/BaseUrl";

export default async function getEmployees() {
	return axios({
		method: "get",
		url: `${base_url}employee/`,
		headers: { Authorization: localStorage.getItem("token") },
	})
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			return err.response;
		});
}
