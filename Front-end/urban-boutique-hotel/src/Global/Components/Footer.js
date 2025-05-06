import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

const Footer = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem("Translate"));
  }, []);
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-col">
          <h4>{t("Explore")}</h4>
          <ul className="footer-links">
            <Link to="/" className="footer-link">
              <li>{t("home")}</li>
            </Link>

            <Link to="/discover" className="footer-link">
              <li>{t("discover")}</li>
            </Link>

            <Link to="/rooms" className="footer-link">
              <li>{t("rooms")}</li>
            </Link>

            <Link to="/services" className="footer-link">
              <li>{t("services")}</li>
            </Link>
          </ul>
        </div>
        <div className="footer-col">
          <h4>{t("aboutus")}</h4>
          <ul className="footer-links">
            <Link to="/contact" className="footer-link">
              <li>{t("contact")}</li>
            </Link>
            <Link to="/privacypolicies" className="footer-link">
              <li>{t("privacypolicy")}</li>
            </Link>
            <Link to="/FAQ" className="footer-link">
              <li>{t("faq")}</li>
            </Link>
          </ul>
        </div>
        <div className="footer-col">
          <h4>{t("followus")}</h4>
          <ul className="social-icons">
            <li>
              <a href="#">
                <i className="fab fa-facebook-f">
                  <FaFacebookF />
                </i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fab fa-twitter">
                  <FaTwitter />
                </i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fab fa-instagram">
                  <FaInstagram />
                </i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fab fa-linkedin-in">
                  {" "}
                  <FaLinkedinIn />
                </i>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p className="text-sm-center">
          &copy;{new Date().getFullYear()} Matar Residence -{" "}
          {t("allrights")}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
