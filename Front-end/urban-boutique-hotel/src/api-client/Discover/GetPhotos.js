import axios from "axios";
import base_url from "../../BaseUrl";

export default async function getPhotos() {
  return axios({
    method: "get",
    url: `${base_url}gallery/get`,
    headers: { Authorization: localStorage.getItem("token") },
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response;
    });
}
