import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

// Icons
import { MdManageAccounts } from "react-icons/md";
import { IoMdOptions } from "react-icons/io";
import { BsPersonLock } from "react-icons/bs";
import Table from "../../Global/Components/Table";

//Apis
import GetReservations from "../../api-client/Account/GetReservations";

const Profile = () => {
  const { t, i18n } = useTranslation();

  const [loading, setLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(true);
  const [initialRows, setRows] = useState([]);

  const {
    status,
    error,
    data: reservationData,
  } = useQuery(["reservationdata"], GetReservations);

  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem("Translate"));
  }, []);

  useEffect(() => {
    const shouldReload = localStorage.getItem("shouldReload");
    if (shouldReload === "true") {
      localStorage.removeItem("shouldReload");
      window.location.reload(true);
    }
  }, []);

  useEffect(() => {
    if (status === "success" && reservationData) {
      const newRows = reservationData.map((reservation) =>
        createData(
          reservation.id,
          reservation.room_id,
          reservation.title,
          reservation.reservation_date,
          reservation.reservation_end,
          reservation.free_dates,
          reservation.occupied_dates
        )
      );
      setRows(newRows);
      setLoading(false);
    }
  }, [reservationData, status, error]);

  const columns = [
    { id: "title", label: t("res_room_name"), minWidth: 100 },
    { id: "reservation_date", label: t("res_checkin"), minWidth: 100 },
    { id: "reservation_end", label: t("res_checkout"), minWidth: 100 },
  ];
  function createData(
    id,
    room_id,
    title,
    reservation_date,
    reservation_end,
    free_dates,
    occupied_dates
  ) {
    return {
      id,
      room_id,
      title,
      reservation_date,
      reservation_end,
      free_dates,
      occupied_dates,
    };
  }
  useEffect(() => {
    if (initialRows.length > 0) {
      setIsEmpty(false);
    } else {
      setIsEmpty(true);
    }
  }, [initialRows]);
  return (
    <div className="account-container">
      <div className="account-section">
        <h2>{t("acc")}</h2>
        <h5>{t("acc_desc")}</h5>
        <div className="settings-container">
          <Link to="/account/profile" className="settings-box">
            <MdManageAccounts className="settings-icon" />
            <div className="settings-content">
              <h3>{t("acc_info")}</h3>
              <p>{t("acc_info_upd")}</p>
              <div className="settings-link">{t("acc_info_mng")}</div>
            </div>
          </Link>
          <Link to="/account/security" className="settings-box">
            <BsPersonLock className="settings-icon" />
            <div className="settings-content">
              <h3>{t("acc_sec")}</h3>
              <p>{t("acc_sec_adj")}</p>
              <div className="settings-link">{t("acc_sec_mng")}</div>
            </div>
          </Link>
          <Link to="/account/preferences" className="settings-box">
            <IoMdOptions className="settings-icon" />
            <div className="settings-content">
              <h3>{t("preferences")}</h3>
              <p>{t("changelg")}</p>
              <div className="settings-link">{t("acc_pref_mng")}</div>
            </div>
          </Link>
        </div>
      </div>
      <div className="reservations-section">
        <h2>{t("acc_res")}</h2>
        {isEmpty ? (
          <>
            {loading ? (
              <div className="buffer-space">
                <div className="buffer-loader home"></div>
              </div>
            ) : (
              <h5>{t("acc_res_no_desc")}</h5>
            )}
          </>
        ) : (
          <>
            {loading ? (
              <div className="buffer-space">
                <div className="buffer-loader home"></div>
              </div>
            ) : (
              <div>
                <h5>{t("acc_res_desc")}</h5>
                <Table columns={columns} initialRows={initialRows} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
