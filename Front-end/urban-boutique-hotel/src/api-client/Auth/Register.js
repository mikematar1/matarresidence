import axios from "axios";

export default async function Register(data) {
  return axios
    .post("http://hotel-env.eba-kq3jviji.eu-north-1.elasticbeanstalk.com/api/v0.1/auth/register", data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
}
