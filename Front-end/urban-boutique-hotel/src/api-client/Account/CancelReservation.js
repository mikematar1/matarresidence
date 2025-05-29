import axios from "axios";
import base_url from "../../BaseUrl";

export default async function cancelReservation(id) {
  return axios({
    method: "get",
    url: `${base_url}room/reservation/cancel/${id}`,
    headers: { Authorization: localStorage.getItem("token") },
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response;
    });
}
