import axios from "axios";
import base_url from "../../BaseUrl";

export default async function getProfile() {
  return axios({
    method: "get",
    url: `${base_url}customer/getinfo`,
    headers: { Authorization: localStorage.getItem("token") },
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response;
    });
}
