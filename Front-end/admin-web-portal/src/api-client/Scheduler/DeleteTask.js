import axios from "axios";
import base_url from "../BaseUrl";

const DeleteTask = async (id) => {
	return await axios({
		method: "get",
		url: `${base_url}task/remove/${id}`,
		headers: {
			Authorization: "Bearer " + localStorage.getItem("token"),
		},
	})
		.then((res) => {
			return res.data;
		})
		.catch((error) => {
			return error;
		});
};

export default DeleteTask;
