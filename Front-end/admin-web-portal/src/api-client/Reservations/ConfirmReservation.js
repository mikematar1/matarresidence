import axios from "axios";
import base_url from "../../urban-boutique-hotel/src/BaseUrl";

const ConfirmReservation = async (id) => {
	return await axios({
		method: "post",
		url: `${base_url}room/reservation/confirm/${id}`,
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

export default ConfirmReservation;
