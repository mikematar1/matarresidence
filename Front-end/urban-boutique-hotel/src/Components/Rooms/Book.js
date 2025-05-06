import { useLocation, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import galleryImage1 from "../../assets/images/gallery-image1.jpg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Footer from "../../Global/Components/Footer";
import { useTranslation } from "react-i18next";

const Book = () => {
  const { t, i18n } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem("Translate"));
  }, []);
  const location = useLocation();
  const navigation = useNavigate();
  const [err, setErr] = useState("");

  const currency = localStorage.getItem("Currency");
  const exchange = localStorage.getItem("Exchange");

  const room = location.state.data;
  const [room_id, setRoonID] = useState(room.room.id);
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [special_request, setSpecialRequest] = useState("");
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const lastFreeDate = room.free_dates[room.free_dates.length - 1];
  const firstFreeDate = room.free_dates[0];
  const [maxCheckout, setMaxDate] = useState(null);
  const [total_price, setTotalPrice] = useState(
    Number(room.room.rent * exchange) * 0.1 + Number(room.room.rent * exchange)
  );
  const countries = [
    "USA",
    "Canada",
    "Mexico",
    "Brazil",
    "Argentina",
    "Chile",
    "Peru",
    "Colombia",
    "Ecuador",
    "Bolivia",
    "Paraguay",
    "Uruguay",
    "Lebanon",
  ];
  //useEffect
  useEffect(() => {
    setCheckOutDate("");
    if (checkInDate) {
      let parsedDate1 = checkInDate;
      let year = parsedDate1.getFullYear();
      let month =
        parsedDate1.getMonth() + 1 < 10
          ? `0${parsedDate1.getMonth() + 1}`
          : parsedDate1.getMonth() + 1;
      let day =
        parsedDate1.getDate() < 10
          ? `0${parsedDate1.getDate()}`
          : parsedDate1.getDate();
      const checkin = `${year}-${month}-${day}`;
      const selectedIndex = room.free_dates.findIndex(
        (date) => date === checkin
      );
      const consecutiveDates = [checkin];
      const checkdate = new Date(lastFreeDate);
      for (let i = selectedIndex + 1; i < room.free_dates.length; i++) {
        const prevDate = new Date(room.free_dates[i - 1]);
        const currDate = new Date(room.free_dates[i]);
        if (currDate.toISOString() === checkdate.toISOString()) {
          setMaxDate(new Date(lastFreeDate));
          break;
        }
        if ((currDate - prevDate) / (1000 * 60 * 60 * 24) === 1) {
          consecutiveDates.push(room.free_dates[i]);
        } else {
          setMaxDate(new Date(consecutiveDates[consecutiveDates.length - 1]));
          break;
        }
      }
    }
  }, [checkInDate]);
  //Validators
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberPattern = /^\d{7,15}$/;
    return phoneNumberPattern.test(phoneNumber);
  };

  const validateRequest = (request) => {
    return request.length <= 255;
  };

  const handleSelectChange = (event) => {
    setCountry(event.target.value);
  };
  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleSpecialRequestChange = (event) => {
    setSpecialRequest(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErr("");
    if (!validateEmail(email)) {
      setErr(t("err_email"));
      return;
    }
    if (!validatePhoneNumber(phone)) {
      setErr(t("err_num"));
      return;
    }
    if (!validateRequest(special_request)) {
      setErr(t("err_special"));
      return;
    }

    let parsedDate1 = checkInDate;
    let year = parsedDate1.getFullYear();
    let month =
      parsedDate1.getMonth() + 1 < 10
        ? `0${parsedDate1.getMonth() + 1}`
        : parsedDate1.getMonth() + 1;
    let day =
      parsedDate1.getDate() < 10
        ? `0${parsedDate1.getDate()}`
        : parsedDate1.getDate();
    const reservation_date = `${year}-${month}-${day}`;
    parsedDate1 = checkOutDate;
    year = parsedDate1.getFullYear();
    month =
      parsedDate1.getMonth() + 1 < 10
        ? `0${parsedDate1.getMonth() + 1}`
        : parsedDate1.getMonth() + 1;
    day =
      parsedDate1.getDate() < 10
        ? `0${parsedDate1.getDate()}`
        : parsedDate1.getDate();
    const reservation_end = `${year}-${month}-${day}`;
    let requests = special_request;
    if (!special_request) {
      requests = "_";
    }
    const data = {
      room_id,
      reservation_date,
      reservation_end,
      requests,
      total_price,
    };
    navigation(`/rooms/payment`, { state: { data: data } });
  };
  return (
    <>
      <div className="contact-section book">
        <div className="message-form book">
          <div className="message-header">
            <div className="room-display book">
              <h1>{t("guestdetails")}</h1>
            </div>
          </div>

          <form className="message-inputs book" onSubmit={handleSubmit}>
            <div className="message-name-email">
              <div className="message-input">
                <DatePicker
                  selected={checkInDate}
                  onChange={(date) => setCheckInDate(date)}
                  minDate={new Date(firstFreeDate)}
                  maxDate={new Date(lastFreeDate)}
                  excludeDates={room.occupied_dates.map(
                    (date) => new Date(date)
                  )}
                  placeholderText={t("res_checkin")}
                  className="react-datepicker"
                  dateFormat="yyyy/MM/dd"
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                />
              </div>
              <div className="message-input">
                <DatePicker
                  selected={checkOutDate}
                  onChange={(date) => setCheckOutDate(date)}
                  minDate={checkInDate}
                  maxDate={maxCheckout}
                  placeholderText={t("res_checkout")}
                  className="react-datepicker"
                  dateFormat="yyyy/MM/dd"
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  disabled={!checkInDate}
                />
              </div>
            </div>
            <div className="message-name-email">
              <div className="message-input">
                <input
                  type="text"
                  id="first_name"
                  placeholder={t("firstname")}
                  value={first_name}
                  onChange={handleFirstNameChange}
                />
              </div>
              <div className="message-input">
                <input
                  type="text"
                  id="last_name"
                  placeholder={t("lastname")}
                  value={last_name}
                  onChange={handleLastNameChange}
                />
              </div>
            </div>

            <div className="message-name-email">
              <div className="message-input">
                <input
                  type="text"
                  id="email"
                  placeholder={t("pro_email")}
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              <div className="message-input">
                <input
                  type="number"
                  id="phone"
                  placeholder={t("pro_num")}
                  value={phone}
                  onChange={handlePhoneChange}
                />
              </div>
            </div>
            <div className="message-input">
              <select
                id="country"
                value={country}
                onChange={handleSelectChange}
              >
                <option className="option-booking" value="">
                  {t("country")}
                </option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
            <div className="message-textarea">
              <textarea
                id="special_request"
                placeholder={t("specialrequest")}
                value={special_request}
                onChange={handleSpecialRequestChange}
              ></textarea>
            </div>
            <div className="booking-policies">
              <p>
                {t("completing")}{" "}
                <Link to="/privacypolicies">{t("privacypolicy")}</Link>.
              </p>
            </div>
            <div className="booking-nav">
              <div className="login-error book">{err}</div>
              <button
                disabled={
                  !first_name ||
                  !last_name ||
                  !email ||
                  !phone ||
                  !country ||
                  !checkInDate ||
                  !checkOutDate
                }
                type="submit"
                className={
                  !first_name ||
                  !last_name ||
                  !email ||
                  !phone ||
                  !country ||
                  !checkInDate ||
                  !checkOutDate
                    ? "disabled-button"
                    : ""
                }
              >
                {t("continue")}
              </button>
            </div>
          </form>
        </div>
        <div className="message-form order">
          <div className="message-header">
            <div className="room-display order">
              <h1>{t("order")}</h1>
            </div>
            <div className="order-image">
              <div className="gallery-image order">
                <img src={room.images[0].image_url} alt="" />
              </div>
            </div>
            <div className="order-infos">
              <div className="order-info">
                <p className="order-label">{t("con_name")}</p>
                <p className="order-desc">{room.room.title}</p>
              </div>
              <div className="order-info">
                <p className="order-label">{t("beds")}</p>
                <p className="order-desc">{room.room.beds}</p>
              </div>
              <div className="order-info">
                <p className="order-label">{t("guests")}</p>
                <p className="order-desc">{room.room.guests + " Adults"}</p>
              </div>
              <div className="underline"></div>
              <div className="order-info price">
                <p className="order-label price">{t("subtotal")}</p>
                <p className="order-desc price">
                  {currency} {room.room.rent * exchange}
                </p>
              </div>
              <div className="order-info">
                <p className="order-label price">{t("tax")} (10%) </p>
                <p className="order-desc price">
                  {currency} {room.room.rent * exchange * 0.1}
                </p>
              </div>
              <div className="underline"></div>
              <div className="order-info">
                <p className="order-label total">{t("total")} </p>
                <p className="order-desc total">
                  {currency} {total_price}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Book;
