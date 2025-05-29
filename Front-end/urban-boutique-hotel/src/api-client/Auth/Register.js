import axios from "axios";
import base_url from "../../BaseUrl";

export default async function Register(data) {
  return axios
    .post(`${base_url}auth/register`, data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
}
