import axios from "axios";
import base_url from "../../BaseUrl";

export default async function FetchCred(data) {
  return axios
    .post(`${base_url}auth/login`, data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
}
