import axios from "axios";

export default async function getClients(queryKey) {
	const url = queryKey.queryKey[1];
	return axios({
		method: "get",
		url: url,
		headers: { Authorization: localStorage.getItem("token") },
	})
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			return err;
		});
}
