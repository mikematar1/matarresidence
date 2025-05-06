// Images
import logo from "../../assets/images/logo.png";
import { HiUserCircle } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import Logout from "../../api-client/Auth/Logout";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

const AccountNav = () => {
  const { t, i18n } = useTranslation();

  const navigation = useNavigate();
  const handleLogout = () => {
    const response = Logout();
    response
      .then((res) => {
        navigation(-1);
      })
      .catch((err) => err);
  };
  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem("Translate"));
  }, []);
  return (
    <nav className="account-navbar" id="navbar">
      <Link to="/">
        <img className="nav-image urban" src={logo} />
      </Link>
      <div className="nav-link" onClick={handleLogout}>
        <div className="login-img">
          <HiUserCircle className="nav-image" />
        </div>
        <div className="routes">{t("logout")}</div>
      </div>
    </nav>
  );
};

export default AccountNav;
