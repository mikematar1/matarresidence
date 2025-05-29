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
            <Link to="https://www.google.com/maps/place/Matar+Residence/@33.8817101,35.5566675,17z/data=!4m9!3m8!1s0x151f17cfa95e84a5:0x4e18f72f5e4478e7!5m2!4m1!1i2!8m2!3d33.8817057!4d35.5540926!16s%2Fg%2F11vs7wd2_d?entry=ttu&g_ep=EgoyMDI1MDUxMy4xIKXMDSoASAFQAw%3D%3D" className="footer-link">
              <li>Location</li>
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
              <a href="https://www.instagram.com/matarresidence">
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
