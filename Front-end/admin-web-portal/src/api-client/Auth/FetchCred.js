import axios from "axios";
import base_url from "../BaseUrl";

export default async function FetchCred(reqData) {
	return axios({
		method: "post",
		url: `${base_url}auth/login`,
		data: reqData,
	})
		.then((res) => {
			if (res.data.message) {
				return res.data.message;
			} else {
				return res.data;
			}
		})
		.catch((err) => {
			return err.response;
		});
}
