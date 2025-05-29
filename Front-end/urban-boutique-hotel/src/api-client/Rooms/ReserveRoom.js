import axios from "axios";
import base_url from "../../BaseUrl";

export default async function ReserveRoom(data) {
  return axios
    .post(`${base_url}room/reservation/reserve`, data, {
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
