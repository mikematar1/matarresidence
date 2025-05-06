import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const MaintenanceSubmitted = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem("Translate"));
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const timeoutId = setTimeout(() => {
        navigate("/account", { replace: true });
      }, 2000);
      return () => clearTimeout(timeoutId);
    }
  }, [isLoading, navigate]);

  return (
    <div className="faq-container">
      {isLoading ? (
        <>
          <h1>{t("submit_main")}</h1>
          <div className="buffer-loader submit"></div>
        </>
      ) : (
        <>
          <h1>{t("submit_main1")}</h1>
          <div className="checkmark-container">
            <div className="check-mark-container">
              <svg className="check-mark-svg" viewBox="0 0 52 52">
                <circle
                  className="check-mark-circle"
                  cx="26"
                  cy="26"
                  r="25"
                  fill="none"
                />
                <path
                  className="check-mark-path"
                  d="M14.1 27.2l7.1 7.2 16.7-16.8"
                />
              </svg>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MaintenanceSubmitted;
