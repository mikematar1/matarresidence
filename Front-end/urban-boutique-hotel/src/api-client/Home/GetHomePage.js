import axios from "axios";

export default async function getHomePage() {
  const discounted_rooms = axios({
    method: "get",
    url: "http://hotel-env.eba-kq3jviji.eu-north-1.elasticbeanstalk.com/api/v0.1/discount/get",
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
    url: "http://hotel-env.eba-kq3jviji.eu-north-1.elasticbeanstalk.com/api/v0.1/review/get",
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
