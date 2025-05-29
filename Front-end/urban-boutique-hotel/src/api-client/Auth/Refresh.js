import axios from "axios";
import base_url from "../../BaseUrl";

export default async function Refresh() {
  return axios
    .get(`${base_url}auth/refresh`, {
      headers: { Authorization: localStorage.getItem("token") },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
}
