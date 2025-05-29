import React, { useState, useEffect } from "react";
import removeProfile from "../../api-client/Account/RemoveProfile";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Security = () => {
  const navigation = useNavigate();
  const { t, i18n } = useTranslation();

  const [reset, setReset] = useState(false);
  const [deleteAcc, setDeleteAcc] = useState(false);

  useEffect(() => {
    handleResetCancel();
    handleDeleteCancel();
  }, []);

  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem("Translate"));
  }, []);
  const handleReset = () => {
    setReset(true);
  };
  const handleResetCancel = () => {
    setReset(false);
  };
  const handleSubmit = () => {
    console.log("Submitted");
  };

  const handleDeleteOpen = () => {
    setDeleteAcc(true);
  };
  const handleDeleteCancel = () => {
    setDeleteAcc(false);
  };
  const handleDelete = async (event) => {
    event.preventDefault();
    try {
      await removeProfile();
      navigation("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="profile-container">
        <div className="profile-section">
          <div className="profile-item">
            <div className="profile-title">
              <h2>{t("acc_sec")}</h2>
              <h5>{t("acc_sec_adj")}</h5>
            </div>
          </div>
          <div className="account-item">
            <label>{t("pro_password")}</label>
            <form className="account-info">
              <div>
                {reset && (
                  <button
                    type="button"
                    className="profile-btn save"
                    onClick={handleSubmit}
                  >
                    {t("pro_send_email")}
                  </button>
                )}
                <button
                  type="button"
                  className="profile-btn"
                  onClick={() => {
                    if (reset) {
                      handleResetCancel();
                    } else {
                      handleReset();
                    }
                  }}
                >
                  {!reset ? t("reset") : t("cancel")}
                </button>
              </div>
            </form>
          </div>
          <div className="account-item">
            <label>{t("account")}</label>
            <form className="account-info">
              <div>
                {deleteAcc && (
                  <button
                    type="button"
                    className="profile-btn save"
                    onClick={handleDelete}
                  >
                    {t("delete")}
                  </button>
                )}
                <button
                  type="button"
                  className="profile-btn"
                  onClick={() => {
                    if (deleteAcc) {
                      handleDeleteCancel();
                    } else {
                      handleDeleteOpen();
                    }
                  }}
                >
                  {!deleteAcc ? t("delete") : t("cancel")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Security;
