import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import Footer from "../../Global/Components/Footer";
//apis
import SendFeedback from "../../api-client/Contact/SendFeedback";

const Feedback = () => {
  const { t, i18n } = useTranslation();
  const [text, setText] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem("Translate"));
  }, []);

  useEffect(() => {
    document.title = "Feedback";
  }, []);

  const handleSubmit = () => {
    const data = { text };
    let response = SendFeedback(data);
    response.then((res) => {
      if (res) {
        navigate("/feedback/submit");
      }
    });
  };

  return (
    <>
      <div className="feedback">
        <div className="feedback-section" id="feedback-section">
          <div className="message-form">
            <div className="message-header">
              <h1>{t("feedback_head")}</h1>
            </div>
            <div className="message-paragraph">
              <p>{t("feedback_w")}</p>
            </div>
            <div className="message-inputs feedback">
              <div className="message-textarea">
                <textarea
                  id="message"
                  name="message"
                  placeholder={t("con_message")}
                  value={text}
                  onChange={(event) => setText(event.target.value)}
                ></textarea>
              </div>
              <div className="feedback-button">
                {" "}
                <button
                  onClick={handleSubmit}
                  disabled={!text}
                  type="submit"
                  className={!text ? "disabled-button" : ""}
                >
                  {t("con_send")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Feedback;
