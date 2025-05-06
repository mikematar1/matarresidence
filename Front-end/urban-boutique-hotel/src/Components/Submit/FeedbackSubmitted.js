import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const FeedbackSubmitted = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigate("/contact", { replace: true });
      window.close();
    }, 5000);
    return () => clearTimeout(timeoutId);
  }, [navigate]);

  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem("Translate"));
  }, []);

  return (
    <div className="feedback-container">
      <h1>{t("feedback_submit1")}</h1>
      <h4>{t("feedback_submit2")}</h4>
      <div className="buffer-loader submit"></div>
    </div>
  );
};

export default FeedbackSubmitted;
