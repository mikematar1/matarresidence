import axios from "axios";
import base_url from "../BaseUrl";

const EditTask = async (data) => {
	return await axios({
		method: "post",
		url: `${base_url}task/edit`,
		data: data,
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

export default EditTask;
