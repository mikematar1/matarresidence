import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Slideshow from "../../Global/Components/Slideshow";
import att_1 from "../../assets/images/att-1.jpg";
import att_2 from "../../assets/images/att-2.jpg";
import att_3 from "../../assets/images/att-3.jpg";
import att_4 from "../../assets/images/att-4.jpg";
import att_5 from "../../assets/images/att-5.jpg";
import { useTranslation } from "react-i18next";

const RoomsItem = () => {
  const { t, i18n } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem("Translate"));
  }, []);
  const location = useLocation();
  const navigate = useNavigate();
  const room = location.state.data;

  const currency = localStorage.getItem("Currency");
  const exchange = localStorage.getItem("Exchange");

  const [title, setName] = useState(room.room.title);
  const [rent, setRent] = useState(room.room.rent);
  const [guests, setGuests] = useState(room.room.guests);
  const [description, setDescription] = useState(room.room.description);
  const [beds, setBeds] = useState(room.room.beds);
  const [tv, setTv] = useState(room.room.tv);
  const [wifi, setWifi] = useState(room.room.shower);
  const [shower, setShower] = useState(room.room.wifi);
  const [mini_bar, setMinibar] = useState(room.room.mini_bar);
  const [desk, setDesk] = useState(room.room.desk);
  const [floor, setFloor] = useState(room.room.floor);
  const [discount, setDiscount] = useState(room.room.discount);
  const [size, setSize] = useState(room.room.size);
  const [breakfast, setBreakfast] = useState(room.room.breakfast);
  const [pets, setPets] = useState(room.room.pets);
  const [images, setImages] = useState(room.images);

  const handleBooking = () => {
    navigate(`/rooms/booking`, { state: { data: room } });
  };
  return (
    <div className="room-item-container">
      <div className="room-header">
        <div className="room-name">
          <h1>{title}</h1>
        </div>
        <div className="room-display">
          <p>{t("price")}</p>
          <p className="room-tag">
            {currency} {Number(rent * exchange).toFixed(0)}.00
          </p>
          <button onClick={handleBooking}>{t("booknow")}</button>
        </div>
      </div>
      <div className="room-images">
        <Slideshow data={images} type={"Room"} />
      </div>
      <div className="room-infos">
        <div className="room-display">
          <p>{t("squarem2")}</p>
          <p className="room-tag">{size}</p>
        </div>
        <div className="room-display">
          <p>{t("guests2")}</p>
          <p className="room-tag">{guests}</p>
        </div>
        <div className="room-display">
          <p>{t("floors")}</p>
          <p className="room-tag">{floor}</p>
        </div>
        <div className="room-display">
          <p>{t("beds2")}</p>
          <p className="room-tag">{beds}</p>
        </div>
      </div>
      <div className="room-options">
        <div className="room-right">
          <div className="room-name description">
            <h1>{t("description")}</h1>
          </div>
          <div className="room-description">
            <p>{description}</p>
          </div>
          <div className="room-name description">
            <h1>{t("pricing")}</h1>
          </div>
          <div className="room-description">
            {discount === 0 ? (
              <div className="room-display pricing">
                <p>{t("price")}</p>
                <p className="room-tag pricing">
                  {currency} {Number(rent * exchange).toFixed(0)}.00
                </p>
              </div>
            ) : (
              <div>
                <div className="room-display pricing">
                  <p>{t("newprice")}</p>
                  <p className="room-tag pricing">
                    {currency} {Number(rent * exchange).toFixed(0)}.00
                  </p>
                </div>
                <div className="room-display pricing">
                  <p>{t("oldprice")}</p>
                  <p className="room-tag pricing">
                    {currency} {Number((rent + discount) * exchange).toFixed(0)}
                    .00
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="room-left">
          <div className="room-name description">
            <h1>{t("amenities")}</h1>
          </div>
          {wifi === 0 ? null : (
            <div className="room-display amenities">
              <p>{t("freewifi")}</p>
            </div>
          )}
          {tv === 0 ? null : (
            <div className="room-display amenities">
              <p>{t("inttv")}</p>
            </div>
          )}
          {shower === 0 ? null : (
            <div className="room-display amenities">
              <p>{t("showerava")}</p>
            </div>
          )}
          {mini_bar === 0 ? null : (
            <div className="room-display amenities">
              <p>{t("minibarava")}</p>
            </div>
          )}
          {desk === 0 ? null : (
            <div className="room-display amenities">
              <p>{t("deskava")}</p>
            </div>
          )}
          {breakfast === 0 ? null : (
            <div className="room-display amenities">
              <p>{t("breakava")}</p>
            </div>
          )}
          {pets === 0 ? null : (
            <div className="room-display amenities">
              <p>{t("petsava")}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomsItem;
