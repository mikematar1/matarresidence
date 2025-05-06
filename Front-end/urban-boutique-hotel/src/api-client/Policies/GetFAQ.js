import axios from "axios";

export default async function getFAQ() {
  return axios({
    method: "get",
    url: "http://hotel-env.eba-kq3jviji.eu-north-1.elasticbeanstalk.com/api/v0.1/faq/get",
    headers: { Authorization: localStorage.getItem("token") },
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response;
    });
}
