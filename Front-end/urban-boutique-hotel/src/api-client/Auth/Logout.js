import axios from "axios";

export default async function Logout() {
  return axios
    .get("http://hotel-env.eba-kq3jviji.eu-north-1.elasticbeanstalk.com/api/v0.1/auth/logout", {
      headers: { Authorization: localStorage.getItem("token") },
    })
    .then((res) => {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("Translate");
      localStorage.removeItem("Lg");
      localStorage.removeItem("Currency");
      localStorage.removeItem("Exchange");
      return res.data;
    })
    .catch((err) => {
      return err;
    });
}
