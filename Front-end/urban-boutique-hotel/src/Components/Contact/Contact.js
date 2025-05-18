import { Link as ScrollLink } from "react-scroll";
import { useState, useEffect } from "react";
import Footer from "../../Global/Components/Footer";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdEmail, MdLocationPin } from "react-icons/md";
import { FaFax } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { Fab } from "@mui/material";
import jwt_decode from "jwt-decode";

//Apis
import SendMessage from "../../api-client/Contact/SendMessage";

const Contact = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem("Translate"));
  }, []);

  //Token handler
  const token = localStorage.getItem("token");
  useEffect(() => {
    const shouldReload = localStorage.getItem("shouldReload");
    if (shouldReload === "true") {
      localStorage.removeItem("shouldReload");
      window.location.reload(true);
    }
  }, []);
  if (token) {
    const decoded = jwt_decode(token);
    const currentTime = Date.now() / 1000; // Convert to seconds

    if (decoded.exp < currentTime) {
      localStorage.removeItem("username");
      localStorage.removeItem("token");
      localStorage.removeItem("Translate");
      localStorage.removeItem("Lg");
      localStorage.removeItem("Exchange");
      localStorage.removeItem("Currency");
      localStorage.setItem("shouldReload", "true");
    }
  }

  //Translation handler
  useEffect(() => {
    if (!localStorage.getItem("Translate")) {
      localStorage.setItem("Translate", "en");
      localStorage.setItem("Lg", "English");
    }
    i18n.changeLanguage(localStorage.getItem("Translate"));
  }, [localStorage.getItem("Translate")]);

  //currency handler
  useEffect(() => {
    if (!localStorage.getItem("Currency")) {
      localStorage.setItem("Currency", "USD");
    }
    if (!localStorage.getItem("Exchange")) {
      localStorage.setItem("Exchange", 1);
    }
  }, [localStorage.getItem("Currency"), localStorage.getItem("Exchange")]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [err, setErr] = useState("");

  //validators
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  const validateMessage = (message) => {
    return message.length <= 255;
  };
  const validateSubject = (subject) => {
    return subject.length <= 35;
  };
  //API handler
  const handleSubmit = (event) => {
    event.preventDefault();
    setErr("");
    if (!validateEmail(email)) {
      setErr(t("err_email"));
      return;
    }
    if (!validateSubject(subject)) {
      setErr(t("err_subject"));
      return;
    }
    if (!validateMessage(message)) {
      setErr(t("err_message"));
      return;
    }
    const body = message;
    const data = {
      name,
      subject,
      email,
      body,
    };
    let response = SendMessage(data);
    response.then((res) => {
      if (res) {
        console.log(res);
      }
    });
  };

  return (
    <>
      <div className="live-chat">
        <Fab
          className="chat-button"
          sx={{
            color: "white",
            fontSize: "14px",
            width: "8em",
            height: "3.5em",
            borderRadius: "30px",
          }}
          onClick={() => window.open("http://matarresidence.com/feedback")}
        >
          {t("feedback")}
        </Fab>
      </div>
      <div className="contactHero">
        <div className="banner">
          <h1>{t("contact")}</h1>
          <div></div>
          <ScrollLink
            to="contact-section"
            smooth={true}
            duration={1000}
            offset={-100}
            className="btn-primary"
          >
            {t("contact_w")}
          </ScrollLink>
        </div>
      </div>
      <div className="contact-section" id="contact-section">
        <div className="side-information">
          <div className="side-info-box">
            <div className="contact-icons">
              <BsFillTelephoneFill />
            </div>
            <div className="contact-stats">
              <div className="contact-stat">{t("pro_num")}</div>
              <div className="contact-paragraph">+96170722272</div>
            </div>
          </div>
          <div className="side-info-box">
            <div className="contact-icons">
              <MdEmail />
            </div>
            <div className="contact-stats">
              <div className="contact-stat">{t("con_email")}</div>
              <div className="contact-paragraph">support@matarresidence.com</div>
            </div>
          </div>
          <div className="side-info-box">
            <div className="contact-icons">
              <FaFax />
            </div>
            <div className="contact-stats">
              <div className="contact-stat">{t("con_fax")}</div>
              <div className="contact-paragraph">1020 Jdeideh </div>
            </div>
          </div>
          <div className="side-info-box">
            <div className="contact-icons location">
              <MdLocationPin />
            </div>
            <div className="contact-stats">
              <div className="contact-stat">{t("con_location")}</div>
              <div className="contact-paragraph">
                Bauchrieh, Lebanon
              </div>
            </div>
          </div>
        </div>
        <div className="message-form">
          <div className="message-header">
            <h1>{t("con_send")}</h1>
          </div>
          <div className="message-paragraph">
            <p>{t("con_send_w")}</p>
          </div>
          <form className="message-inputs contact" onSubmit={handleSubmit}>
            <div className="message-name-email">
              <div className="message-input">
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder={t("con_name")}
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
              <div className="message-input">
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder={t("pro_email")}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
            </div>
            <div className="message-input">
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder={t("con_subject")}
                value={subject}
                onChange={(event) => setSubject(event.target.value)}
              />
            </div>
            <div className="message-textarea">
              <textarea
                id="message"
                name="message"
                placeholder={t("con_message")}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
              ></textarea>
            </div>
            <div className="login-error contact">{err}</div>

            <button
              disabled={!name || !email || !subject || !message}
              type="submit"
              className={
                !name || !email || !subject || !message ? "disabled-button" : ""
              }
            >
              {t("con_send")}
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Contact;
