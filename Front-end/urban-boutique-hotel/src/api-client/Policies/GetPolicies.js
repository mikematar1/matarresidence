import axios from "axios";
import base_url from "../../BaseUrl";

export default async function getPolicies() {
  return axios({
    method: "get",
    url: `${base_url}policy/get`,
    headers: { Authorization: localStorage.getItem("token") },
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response;
    });
}
