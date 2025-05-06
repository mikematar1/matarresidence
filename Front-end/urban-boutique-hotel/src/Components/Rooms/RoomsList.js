import { useNavigate } from "react-router-dom";
import SingleRoom from "../Rooms/SingleRoom";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

const RoomsList = ({ rooms }) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem("Translate"));
  }, []);
  if (rooms.length === 0) {
    return (
      <div className="empty-search">
        <h3>{t("no_rooms")}</h3>
      </div>
    );
  }

  const handleRedirect = (item) => {
    navigate(`/rooms/${item.room.title}`, { state: { data: item } });
  };

  return (
    <section className="roomslist" id="roomlist">
      {rooms.map((item) => (
        <SingleRoom
          reverse={false}
          room={item}
          type={null}
          key={item.room.id}
        />
      ))}
    </section>
  );
};

export default RoomsList;
