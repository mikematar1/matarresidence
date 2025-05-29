import axios from "axios";
import base_url from "../../BaseUrl";

export default async function getHomePage() {
  const discounted_rooms = axios({
    method: "get",
    url: `${base_url}discount/get`,
    headers: { Authorization: localStorage.getItem("token") },
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response;
    });
  const reviews = axios({
    method: "get",
    url: `${base_url}review/get`,
    headers: { Authorization: localStorage.getItem("token") },
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response;
    });
  return [discounted_rooms, reviews];
}
