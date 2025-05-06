import axios from "axios";

export default async function ReserveRoom(data) {
  return axios
    .post("http://hotel-env.eba-kq3jviji.eu-north-1.elasticbeanstalk.com/api/v0.1/room/reservation/reserve", data, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
}
