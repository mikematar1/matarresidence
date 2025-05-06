import axios from "axios";

export default async function SendMessage(data) {
  return axios
    .post("http://hotel-env.eba-kq3jviji.eu-north-1.elasticbeanstalk.com/api/v0.1/email/sendform", data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
}
