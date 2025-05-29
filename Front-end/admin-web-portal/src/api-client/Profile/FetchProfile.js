import axios from "axios";
import base_url from "../../urban-boutique-hotel/src/BaseUrl";

export default async function FetchProfile() {
	return await axios
		.get(`${base_url}staff/getinfo`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		})
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			return err;
		});
}
