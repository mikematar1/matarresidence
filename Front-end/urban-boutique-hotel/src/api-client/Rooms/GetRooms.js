import axios from "axios";
import base_url from "../../BaseUrl";

export default async function getRooms() {
  return axios({
    method: "get",
    url: `${base_url}room/get`,
    headers: { Authorization: localStorage.getItem("token") },
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response;
    });
}
