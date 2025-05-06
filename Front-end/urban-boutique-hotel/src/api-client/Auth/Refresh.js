import axios from "axios";

export default async function Refresh() {
  return axios
    .get("http://hotel-env.eba-kq3jviji.eu-north-1.elasticbeanstalk.com/api/v0.1/auth/refresh", {
      headers: { Authorization: localStorage.getItem("token") },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
}
