import axios from "axios";
import base_url from "../../BaseUrl";

export default async function SendMessage(data) {
  return axios
    .post(`${base_url}email/sendform`, data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
}
