import { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { HiUserCircle } from "react-icons/hi";
import { useTranslation } from "react-i18next";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
// Images
import logo from "../../assets/images/logo.png";

const Navbar = () => {
  const { t, i18n } = useTranslation();

  const navigation = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const path = useLocation().pathname;
  const [active, setActive] = useState(false);
  const [username, setUsername] = useState("");
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);
  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem("Translate"));
  }, []);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  useEffect(() => {
    setUsername(localStorage.getItem("username"));
  }, [isLoggedIn]);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useEffect(() => {
    const navbar = document.getElementById("navbar");
    const links = document.getElementById("links-section");
    const login_btn = document.getElementById("login-btn");

    if (windowSize[0] > 1000) {
      navbar.style.height = "4em";
      links.style.pointerEvents = "all";
      login_btn.style.opacity = "1";
      login_btn.style.pointerEvents = "all";
    }
    if (windowSize[0] < 1000) {
      login_btn.style.opacity = "0";
      login_btn.style.pointerEvents = "none";
    }
  }, [windowSize]);

  const handleToggle = () => {
    if (windowSize[0] < 1000) {
      setActive(!active);
      const navbar = document.getElementById("navbar");
      const links = document.getElementById("links-section");
      const login_btn = document.getElementById("login-btn");

      navbar.style.height = "auto";
      links.style.pointerEvents = "all";
      login_btn.style.opacity = "1";
      login_btn.style.pointerEvents = "all";
    }
  };
  const handleAccount = () => {
    navigation("/account");
  };

  const handleClose = () => {
    if (windowSize[0] < 1000) {
      setActive(!active);
      const navbar = document.getElementById("navbar");
      const links = document.getElementById("links-section");
      const login_btn = document.getElementById("login-btn");

      navbar.style.height = "4em";
      login_btn.style.opacity = "0";
      links.style.pointerEvents = "none";
      login_btn.style.pointerEvents = "none";
    }
  };
  return (
    <nav className="navbar" id="navbar">
      <Link to="/">
        <img className="nav-image urban" src={logo} />
      </Link>
      <ul
        className={active ? "links-section" : "links-section show-nav"}
        id="links-section"
      >
        {" "}
        <Link to="/" className="nav-link" onClick={handleClose}>
          <li className={`routes ${path === "/" ? "active" : ""}`}>
            {t("home")}
          </li>
        </Link>
        <Link to="/rooms" className="nav-link" onClick={handleClose}>
          <li className={`routes ${path === "/rooms" ? "active" : ""}`}>
            {t("rooms")}
          </li>
        </Link>
       
        <Link to="/discover" className="nav-link" onClick={handleClose}>
          <li className={`routes ${path === "/discover" ? "active" : ""}`}>
            {t("discover")}
          </li>
        </Link>
        <Link to="/contact" className="nav-link" onClick={handleClose}>
          <li className={`routes ${path === "/contact" ? "active" : ""}`}>
            {t("contact")}
          </li>
        </Link>
      </ul>
      <div className="login-section">
        {isLoggedIn ? (
          <div className="login-btn" id="login-btn">
            <div className="nav-link" onClick={handleAccount}>
              <div className="login-img">
                <HiUserCircle className="nav-image" />
              </div>
              <div className="routes login">{username.replace(/"/g, "")}</div>
            </div>
          </div>
        ) : (
          <div className="login-btn" id="login-btn">
            <Link to="/login" className="nav-link" onClick={handleClose}>
              <div className="login-img">
                <HiUserCircle className="nav-image" />
              </div>
              <div className="routes login">{t("login")}</div>
            </Link>
          </div>
        )}
      </div>
      {!active && (
        <button type="button" className="nav-btn" onClick={handleToggle}>
          <AiOutlineMenu className="nav-icon" />
        </button>
      )}
      {active && (
        <button
          type="button"
          className="nav-btn close-btn"
          onClick={handleClose}
        >
          <AiOutlineClose className="nav-icon" />
        </button>
      )}
    </nav>
  );
};

export default Navbar;
