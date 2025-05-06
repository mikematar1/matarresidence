import { Link as ScrollLink } from "react-scroll";
import { useState, useEffect } from "react";
import Footer from "../../Global/Components/Footer";
import jwt_decode from "jwt-decode";

import { FaTimes } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";

import aboutImage1 from "../../assets/images/balcony-image.jpeg";
import aboutImage2 from "../../assets/images/about-image2.jpeg";

//apis
import GetPhotos from "../../api-client/Discover/GetPhotos";

const Discover = () => {
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

  const [images, setImages] = useState(null);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (image) => {
    setSelectedImage(image);
    setModalOpen(true);
    document.body.style.overflow = "hidden"; // disable scrolling
  };

  const closeModal = () => {
    setSelectedImage(null);
    setModalOpen(false);
    document.body.style.overflow = "auto"; // enable scrolling
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = "auto"; // enable scrolling on unmount
    };
  }, []);

  //Api handler
  const {
    status,
    error,
    data: photoData,
  } = useQuery(["photoData"], GetPhotos, {
    staleTime: 300000, // 5 minutes
  });
  useEffect(() => {
    if (status === "success" && photoData) {
      setImages(photoData);
      setLoading(false);
    }
  }, [photoData, status]);
  return (
    <>
      <div className="aboutHero">
        <div className="banner">
          <h1>{t("discover")}</h1>
          <div></div>
          <ScrollLink
            to="about-section"
            smooth={true}
            duration={1000}
            offset={-100}
            className="btn-primary"
          >
            {t("home_w")}
          </ScrollLink>
        </div>
      </div>
      <div className="about">
        <section className="about-section" id="about-section">
          <div className="about-img">
            <div className="about-img1">
              <img src={aboutImage2} alt="" className="about-image1" />
            </div>
            <div className="about-img2">
              <img src={aboutImage1} alt="" className="about-image2" />
            </div>
          </div>
          <div className="about-description">
            <div className="heading">
              <h5>{t("discover_w1")}</h5>
            </div>
            <h2>{t("discover_w2")}</h2>
            <p>{t("discover_p")}</p>
          </div>
        </section>
      </div>
      {modalOpen && (
        <div className="modal">
          <button className="modal-close" onClick={closeModal}>
            <FaTimes />
          </button>
          <img src={selectedImage} alt="" />
        </div>
      )}

      <div className="gallery">
        <h2>{t("photogallery")}</h2>
        {loading ? (
          <div className="buffer-space">
            <div className="buffer-loader home"></div>
          </div>
        ) : (
          <div className="gallery-images">
            {images.map((image, index) => (
              <div
                key={index}
                className="gallery-image"
                onClick={() => openModal(image.image_url)}
              >
                <img src={image.image_url} alt="" />
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Discover;
