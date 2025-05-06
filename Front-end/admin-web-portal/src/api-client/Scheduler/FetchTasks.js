import axios from "axios";
import base_url from "../BaseUrl";

const FetchTasks = async (data) => {
	return await axios({
		method: "get",
		url: `${base_url}task/getall`,
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

export default FetchTasks;
