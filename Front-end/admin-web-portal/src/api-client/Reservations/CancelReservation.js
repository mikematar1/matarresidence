import axios from "axios";
import base_url from "../BaseUrl";

const CancelReservation = async (id) => {
	return await axios({
		method: "get",
		url: `${base_url}room/reservation/cancel_res/${id}`,
		headers: {
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	})
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			return err.response.data;
		});
};

export default CancelReservation;
