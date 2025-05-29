import { Link as ScrollLink } from "react-scroll";
import { useState, useEffect } from "react";
import Footer from "../../Global/Components/Footer";

import breakfastImg from "../../assets/images/breakfast.jpg";
import groupOffersImg from "../../assets/images/group-offers.jpg";
import parkingImg from "../../assets/images/parking.jpg";
import promotionsImg from "../../assets/images/promotions.jpg";
import { useTranslation } from "react-i18next";
import jwt_decode from "jwt-decode";

const Services = () => {
  const { t, i18n } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem("Translate"));
  }, []);

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

  const servicesData = [
    {
      id: 1,
      title: t("breakfast_t"),
      description: t("breakfast"),
      image: breakfastImg,
    },
    {
      id: 2,
      title: t("groupoffers_t"),
      description: t("groupoffers"),
      image: groupOffersImg,
    },
    {
      id: 3,
      title: t("parking_t"),
      description: t("parking"),
      image: parkingImg,
    },
    {
      id: 4,
      title: t("promotions_t"),
      description: t("promotions"),
      image: promotionsImg,
    },
  ];

  return (
    <>
      <div className="servicesHero">
        <div className="banner">
          <h1>{t("services")}</h1>
          <div></div>
          <ScrollLink
            to="services-container"
            smooth={true}
            duration={1000}
            offset={-100}
            className="btn-primary"
          >
            {t("services_w")}
          </ScrollLink>
        </div>
      </div>
      <div className="services-container">
        {servicesData.map((service) => (
          <div className="service-item" key={service.id}>
            {service.id % 2 === 0 ? (
              <>
                <div className="service-content">
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-description">{service.description}</p>
                </div>
                <div className="service-image-container-inversed">
                  <img
                    src={service.image}
                    alt="image"
                    className="service-image"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="service-image-container">
                  <img
                    src={service.image}
                    alt="image"
                    className="service-image"
                  />
                </div>
                <div className="service-content">
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-description">{service.description}</p>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default Services;
