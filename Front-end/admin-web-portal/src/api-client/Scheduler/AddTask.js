import axios from "axios";
import base_url from "../BaseUrl";

const AddTask = async (data) => {
	return await axios({
		method: "post",
		url: `${base_url}task/add`,
		data: data,
		headers: {
			Authorization: "Bearer " + localStorage.getItem("token"),
		},
	})
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			return error;
		});
};

export default AddTask;
