import axiso from "axios";
import base_url from "../BaseUrl";

export default async function AssignEmployee(data) {
	return await axiso({
		method: "post",
		url: `${base_url}maintenance/assign`,
		data: data,
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
