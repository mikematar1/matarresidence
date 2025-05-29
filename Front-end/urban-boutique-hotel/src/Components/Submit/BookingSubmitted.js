import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const BookingSubmitted = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigate("/", { replace: true });
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [navigate]);
  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem("Translate"));
  }, []);

  return (
    <div className="faq-container">
      <h1>{t("submit_1")}</h1>
      <h4>{t("submit_2")}</h4>
      <div className="buffer-loader submit"></div>
    </div>
  );
};

export default BookingSubmitted;
