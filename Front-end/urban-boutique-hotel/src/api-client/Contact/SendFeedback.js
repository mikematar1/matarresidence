import axios from "axios";
export default async function editProfile(data) {
  return axios
    .post("http://hotel-env.eba-kq3jviji.eu-north-1.elasticbeanstalk.com/api/v0.1/feedback/add", data, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response;
    });
}
