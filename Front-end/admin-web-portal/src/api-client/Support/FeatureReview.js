import axios from "axios";
import base_url from "../BaseUrl";

export default async function FeatureReview(id) {
	return await axios({
		method: "GET",
		url: `${base_url}review/feature/${id}`,
		headers: {
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	})
		.then((res) => {
			return res;
		})
		.catch((err) => {
			return err;
		});
}
