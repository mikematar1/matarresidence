import axios from "axios";
import base_url from "../../BaseUrl";

export default async function ReserveRoombyCard(data) {
  return axios
    .post(`${base_url}room/reservation/reservebycard`, data, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
}
