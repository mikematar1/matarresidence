import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";

//apis
import GetCurrency from "../../api-client/Account/GetCurrency";

const Preferences = () => {
  const { t, i18n } = useTranslation();

  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currency, setCurrency] = useState(localStorage.getItem("Currency"));
  const [currencies, setCurrencies] = useState(null);
  const [language, setLanguage] = useState(localStorage.getItem("Lg"));

  const {
    status,
    error,
    data: currencyData,
  } = useQuery(["currencydata"], GetCurrency, {
    staleTime: 300000, // 5 minutes
  });

  useEffect(() => {
    if (status === "success" && currencyData) {
      setCurrencies(currencyData);
      setLoading(false);
    }
  }, [currencyData, status, error]);

  useEffect(() => {
    handleCancel();
  }, []);
  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem("Translate"));
    setLanguage(localStorage.getItem("Lg"));
  }, [localStorage.getItem("Translate")]);

  const handleEdit = () => {
    setEdit(true);
  };
  const handleCancel = () => {
    setEdit(false);
    setCurrency(localStorage.getItem("Currency"));
    setLanguage(localStorage.getItem("Lg"));
  };
  const handleSubmit = () => {
    setEdit(false);
    if (language === "English") {
      localStorage.setItem("Translate", "en");
      localStorage.setItem("Lg", "English");
    }
    if (language === "Spanish") {
      localStorage.setItem("Translate", "es");
      localStorage.setItem("Lg", "Spanish");
    }
    if (language === "French") {
      localStorage.setItem("Translate", "fr");
      localStorage.setItem("Lg", "French");
    }
    if (language === "German") {
      localStorage.setItem("Translate", "de");
      localStorage.setItem("Lg", "German");
    }
    if (language === "Italian") {
      localStorage.setItem("Translate", "it");
      localStorage.setItem("Lg", "Italian");
    }
    currencies.map((item) => {
      if (item.symbol === currency) {
        localStorage.setItem("Currency", item.symbol);
        localStorage.setItem("Exchange", item.exchange_rate);
      }
    });
  };

  return (
    <>
      <div className="profile-container">
        <form className="profile-section">
          <div className="profile-item">
            <div className="profile-title">
              <h2>{t("preferences")}</h2>
              <h5>{t("changelg")}</h5>
            </div>
            <div>
              {edit && (
                <button
                  type="Submit"
                  className="profile-btn save"
                  onClick={handleSubmit}
                >
                  {t("save")}
                </button>
              )}
              <button
                type="button"
                className="profile-btn"
                onClick={() => {
                  if (edit) {
                    handleCancel();
                  } else {
                    handleEdit();
                  }
                }}
              >
                {!edit ? t("edit") : t("cancel")}
              </button>
            </div>
          </div>
          {loading ? (
            <div>
              <div className="account-item">
                <div className="account-info">
                  <div className="info-item">
                    <label>{t("currency")}</label>
                  </div>
                  <div className="info-item">
                    <div className="buffer-loader"></div>
                  </div>
                </div>
              </div>
              <div className="account-item">
                <div className="account-info">
                  <div className="info-item">
                    <label>{t("language")}</label>
                  </div>
                  <div className="info-item">
                    <div className="buffer-loader"></div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="account-item">
                <div className="account-info">
                  <div className="info-item">
                    <label>{t("currency")}</label>
                  </div>
                  {edit && (
                    <div className="info-item">
                      <select
                        className="account-input"
                        value={currency}
                        onChange={(e) => {
                          setCurrency(e.target.value);
                        }}
                      >
                        {currencies.map((currencyData, index) => (
                          <option key={index} value={currencyData.symbol}>
                            {currencyData.symbol}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  {!edit && (
                    <div className="info-item">
                      <p>{currency}</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="account-item">
                <div className="account-info">
                  <div className="info-item">
                    <label>{t("language")}</label>
                  </div>
                  {edit && (
                    <div className="info-item">
                      <select
                        className="account-input"
                        value={language}
                        onChange={(e) => {
                          setLanguage(e.target.value);
                        }}
                      >
                        <option value="English">English</option>
                        <option value="Spanish">Spanish</option>
                        <option value="French">French</option>
                        <option value="German">German</option>
                        <option value="Italian">Italian</option>
                      </select>
                    </div>
                  )}
                  {!edit && (
                    <div className="info-item">
                      <p>{language}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default Preferences;
