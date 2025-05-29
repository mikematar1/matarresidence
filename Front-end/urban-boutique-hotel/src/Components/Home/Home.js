import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { FaClock, FaCoffee, FaHeart } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
// Componenets
import Footer from "../../Global/Components/Footer";
import SingleRoom from "../Rooms/SingleRoom";
import Reviews from "../../Global/Components/Reviews";
import { useTranslation } from "react-i18next";

//APIS
import GetHomePage from "../../api-client/Home/GetHomePage";

// Images

const Home = () => {
  const { t, i18n } = useTranslation();
  const [rooms, setRooms] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  //Token handler
  const token = localStorage.getItem("token");
  useEffect(() => {
    const shouldReload = localStorage.getItem("shouldReload");
    if (shouldReload === "true") {
      localStorage.removeItem("shouldReload");
      window.location.reload(true);
    }
  }, []);
  if (token) {
    const decoded = jwt_decode(token);
    const currentTime = Date.now() / 1000; // Convert to seconds

    if (decoded.exp < currentTime) {
      localStorage.removeItem("username");
      localStorage.removeItem("token");
      localStorage.removeItem("Translate");
      localStorage.removeItem("Lg");
      localStorage.removeItem("Exchange");
      localStorage.removeItem("Currency");
      localStorage.setItem("shouldReload", "true");
    }
  }
  //Translation handler
  useEffect(() => {
    if (!localStorage.getItem("Translate")) {
      localStorage.setItem("Translate", "en");
      localStorage.setItem("Lg", "English");
    }
    i18n.changeLanguage(localStorage.getItem("Translate"));
  }, [localStorage.getItem("Translate")]);

  //currency handler
  useEffect(() => {
    if (!localStorage.getItem("Currency")) {
      localStorage.setItem("Currency", "USD");
    }
    if (!localStorage.getItem("Exchange")) {
      localStorage.setItem("Exchange", 1);
    }
  }, [localStorage.getItem("Currency"), localStorage.getItem("Exchange")]);

  //Api handler
  const {
    status,
    error,
    data: homeData,
  } = useQuery(["homedata"], GetHomePage, {
    staleTime: 300000, // 5 minutes
  });
  useEffect(() => {
    if (status === "success" && homeData) {
      const promises = Object.values(homeData);
      Promise.all(promises).then((results) => {
        console.log(results);
        setRooms(results[0]);
        setReviews(results[1]);
        setLoading(false);
      });
    }
  }, [homeData, status]);

  const services = [
    {
      icon: <FaClock />,
      title: t("room_service_t"),
      info: t("room_service"),
    },
    {
      icon: <FaCoffee />,
      title: t("coffee_t"),
      info: t("coffee"),
    },
    {
      icon: <FaHeart />,
      title: t("wellness_t"),
      info: t("wellness"),
    },
  ];
  return (
    <>
      <div className="defaultHero">
        <div className="banner">
          <h1>Matar Residence</h1>
          <div></div>
          <p>{t("home_w")}</p>
          <Link to="/rooms" className="btn-primary">
            {t("room_w")}
          </Link>
        </div>
      </div>
      {loading ? (
        <div className="buffer-space">
          <div className="buffer-loader home"></div>
        </div>
      ) : (
        <div>
          {rooms.map((room, index) => (
            <SingleRoom
              key={index}
              reverse={index % 2 === 0}
              room={room}
              type={room.room.featured === 1 ? t("home_feat") : t("home_feat2")}
            />
          ))}
        </div>
      )}
      <div className="services-section">
        <div className="section-title">
          <h4>{t("services")}</h4>
          <div />
        </div>
      </div>
      <div className="services">
        <div className="services-center">
          {services.map((item, index) => {
            return (
              <article key={index} className="service">
                <span>{item.icon}</span>
                <h6>{item.title}</h6>
                <p>{item.info}</p>
              </article>
            );
          })}
        </div>
      </div>
      {loading ? (
        <div className="buffer-space">
          <div className="buffer-loader home"></div>
        </div>
      ) : (
        <div>
          <Reviews data={reviews} />
          <Footer />
        </div>
      )}
    </>
  );
};

export default Home;
