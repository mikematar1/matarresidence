import axios from "axios";
import base_url from "../../BaseUrl";

export default async function removeProfile() {
  return axios({
    method: "get",
    url: `${base_url}customer/remove`,
    headers: { Authorization: localStorage.getItem("token") },
  })
    .then((res) => {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      return res.data;
    })
    .catch((err) => {
      return err.response;
    });
} // const response = removeProfile();
// response
//   .then((res) => {
//     navigation(-1);
//   })
//   .catch((err) => err);
