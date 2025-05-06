import { useNavigate } from "react-router-dom";

import { RxPerson } from "react-icons/rx";
import { TbResize } from "react-icons/tb";
import { AiOutlineWifi } from "react-icons/ai";
import { CgScreen } from "react-icons/cg";
import { MdOutlineShower, MdOutlineLocalBar } from "react-icons/md";
import { GiTowel, GiDesk } from "react-icons/gi";
import { IoIosArrowUp } from "react-icons/io";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

import dummy1 from "../../assets/images/room-1.jpeg";

const SingleRoom = ({ reverse, room, type }) => {
  const currency = localStorage.getItem("Currency");
  const exchange = localStorage.getItem("Exchange");
  const { t, i18n } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem("Translate"));
  }, []);
  const navigate = useNavigate();

  const handleRedirect = (item) => {
    navigate(`/rooms/${item.room.title}`, { state: { data: item } });
  };
  return (
    <div
      className={`deals-rooms ${type ? "" : "mg-bot"} ${
        reverse ? "reverse" : ""
      }`}
      id="deals-rooms"
      onClick={() => handleRedirect(room)}
    >
      
      <div className="deal-info">
        {type && <h2>{type}</h2>}
        {type && <h5>{room.room.title}</h5>}
        {!type && <h2>{room.room.title}</h2>}
        <p>{room.room.description}</p>
        <div className="deal-stats">
          <div className="stat-item">
            <RxPerson />
            <p>
              {t("occupancy")}: {room.room.guests}
            </p>
          </div>
          <div className="stat-item">
            <TbResize />
            <p>
              {t("size")}: {room.room.size}
              {t("sqm")}
            </p>
          </div>
          {room.room.wifi ? (
            <div className="stat-item">
              <AiOutlineWifi />
              <p>{t("wifi")}</p>
            </div>
          ) : null}
          {room.room.tv ? (
            <div className="stat-item">
              <CgScreen />
              <p>{t("tv")}</p>
            </div>
          ) : null}
          {room.room.shower ? (
            <div className="stat-item">
              <MdOutlineShower />
              <p>{t("shower")}</p>
            </div>
          ) : null}
          {room.room.towels ? (
            <div className="stat-item">
              <GiTowel />
              <p>{t("towels")}</p>
            </div>
          ) : null}
          {room.room.mini_bar ? (
            <div className="stat-item">
              <MdOutlineLocalBar />
              <p>{t("minibar")}</p>
            </div>
          ) : null}
          {room.room.desk ? (
            <div className="stat-item">
              <GiDesk />
              <p>{t("workspace")}</p>
            </div>
          ) : null}
        </div>
        <div className="prices">
          <h4>
            {currency} {Number(room.room.rent * exchange).toFixed(0)}
          </h4>
          {room.room.discount ? (
            <h4 className="old-price">
              {currency}{" "}
              {Number((room.room.rent + room.room.discount) * exchange).toFixed(
                0
              )}
            </h4>
          ) : null}
        </div>
        <button className="btn-secondary">
          {t("learnmore")}
          <IoIosArrowUp className="arrow" />
        </button>
      </div>
      <img src={room.images[0].image_url} alt="" className="deal-image" />
    </div>
  );
};

export default SingleRoom;
