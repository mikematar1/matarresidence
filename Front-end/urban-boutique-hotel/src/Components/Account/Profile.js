import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

// Components
import Footer from "../../Global/Components/Footer";
import countries from "../../Global/Components/CountryCodes";

//APIs
import GetProfile from "../../api-client/Account/GetProfile";
import EditProfile from "../../api-client/Account/EditProfile";

const Profile = () => {
  const { t, i18n } = useTranslation();
  const [user, setUser] = useState({});
  const [user_details, setUserDetails] = useState({});

  const [err, setErr] = useState("");

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [full_number, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [tmp_number, setTmpNumber] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");

  const [edit, setEdit] = useState(false);
  const [hasChanged, setHasChanged] = useState(false);
  const [loading, setLoading] = useState(true);

  //useEffects
  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem("Translate"));
  }, []);
  const {
    status,
    error,
    data: profileData,
  } = useQuery(["profiledata"], GetProfile);
  useEffect(() => {
    if (status === "success" && profileData) {
      setName(profileData.user?.name);
      setUsername(profileData.user?.username);
      setEmail(profileData.user?.email);
      setDob(profileData.user?.dob);
      setGender(profileData.user?.gender);
      setPhoneNumber(profileData.user_details?.full_number);
      setUser(profileData.user);
      setUserDetails(profileData.user_details);
      setLoading(false);
    } else if (error) {
      setErr(error.message);
    }
  }, [profileData, status, error]);

  // Only send request if changes have been made
  useEffect(() => {
    if (
      username &&
      name &&
      email &&
      countryCode &&
      tmp_number &&
      dob &&
      gender &&
      (username !== user.username ||
        name !== user.name ||
        email !== user.email ||
        countryCode + " " + tmp_number !== user_details.phone_number ||
        dob !== user.dob ||
        gender !== user.gender)
    ) {
      setHasChanged(true);
    } else {
      setHasChanged(false);
    }
  }, [
    name,
    username,
    email,
    countryCode,
    tmp_number,
    dob,
    gender,
    user,
    user_details,
  ]);

  useEffect(() => {
    if (full_number) {
      setCountryCode(full_number.split(" ")[0]);
      setTmpNumber(full_number.split(" ")[1]);
    }
  }, [edit, full_number]);
  useEffect(() => {
    handleCancel();
  }, [user, user_details]);

  //Validators
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  const validateUsername = (username) => {
    return username.length <= 25 && username.length > 0;
  };
  const validateName = (name) => {
    return name.length > 0;
  };
  const validateDate = (dob) => {
    const ageLimit = 18;
    const parsedDate = Date.parse(dob);
    if (dob === "") {
      return false;
    }
    // Check if input is a valid date string
    if (isNaN(parsedDate)) {
      return false;
    }

    const inputDate = new Date(parsedDate);

    // Check if input date is in the future
    if (inputDate.getTime() > Date.now()) {
      return false;
    }

    const diff = Date.now() - inputDate.getTime();
    const age = new Date(diff);

    // Check if age is exactly 18 years old
    if (age.getUTCFullYear() - 1970 === ageLimit) {
      const todayYear = new Date().getFullYear();
      const isLeapYear = new Date(todayYear, 1, 29).getMonth() === 1;

      if (isLeapYear) {
        // Leap year, so February 29th is valid
        return inputDate.getMonth() === 1 && inputDate.getDate() === 29;
      } else {
        // Not a leap year, so February 28th is valid
        return inputDate.getMonth() === 1 && inputDate.getDate() === 28;
      }
    }

    return age.getUTCFullYear() - 1970 >= ageLimit;
  };
  const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberPattern = /^\d{7,15}$/;
    return phoneNumberPattern.test(phoneNumber);
  };

  const handleEdit = () => {
    setEdit(true);
  };
  const handleCancel = () => {
    setErr("");
    setEdit(false);
    setUsername(user.username);
    setName(user.name);
    setEmail(user.email);
    setPhoneNumber(user_details.phone_number);
    setDob(user.dob);
    setGender(user.gender);
    setHasChanged(false);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!hasChanged) {
      setEdit(false);
      return;
    }
    setErr("");
    if (!validateUsername(username)) {
      if (username.length === 0) {
        setErr(t("err_username"));
      } else {
        setErr(t("err_username2"));
      }
      return;
    }
    if (!validateName(name)) {
      setErr(t("err_name"));
      return;
    }
    if (!validateEmail(email)) {
      setErr(t("err_email"));
      return;
    }
    if (!validatePhoneNumber(tmp_number)) {
      setErr(t("err_num"));
      return;
    }
    if (!validateDate(dob)) {
      setErr(t("err_dob"));
      return;
    }
    const phone_number = countryCode + " " + tmp_number;
    setPhoneNumber(phone_number);
    event.preventDefault();
    const data = {
      username,
      name,
      email,
      gender,
      dob,
      phone_number,
    };
    let response = EditProfile(data);
    response.then((res) => {
      if (res.status === 409) {
        setErr(t("err_email2"));
      } else {
        setUser({
          ...user,
          name,
          username,
          email,
          gender,
          dob,
        });
        setUserDetails({
          ...user_details,
          phone_number,
        });
        setEdit(false);
        localStorage.setItem("username", username);
      }
    });
  };
  function formatDate(dateString) {
    if (!dateString || !dateString.includes("-")) {
      return "Invalid date format";
    }
    const [year, month, day] = dateString.split("-");
    return `${month}/${day}/${year}`;
  }

  return (
    <>
      <div className="profile-container">
        <form className="profile-section">
          <div className="profile-item">
            <div className="profile-title">
              <h2>{t("acc_info")}</h2>
              <h5>{t("acc_info_upd")}</h5>
              <div className="edit-error">{err}</div>
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
                    <label>{t("pro_name")}</label>
                  </div>
                  <div className="info-item">
                    <div className="buffer-loader"></div>
                  </div>
                </div>
              </div>
              <div className="account-item">
                <div className="account-info">
                  <div className="info-item">
                    <label>{t("pro_username")}</label>
                  </div>
                  <div className="info-item">
                    <div className="buffer-loader"></div>
                  </div>
                </div>
              </div>
              <div className="account-item">
                <div className="account-info">
                  <div className="info-item">
                    <label>{t("pro_email")}</label>
                  </div>
                  <div className="info-item">
                    <div className="buffer-loader"></div>
                  </div>
                </div>
              </div>
              <div className="account-item">
                <div className="account-info">
                  <div className="info-item">
                    <label>{t("pro_num")}</label>
                  </div>
                  <div className="info-item">
                    <div className="buffer-loader"></div>
                  </div>
                </div>
              </div>
              <div className="account-item">
                <div className="account-info">
                  <div className="info-item">
                    <label>{t("pro_dob")}</label>
                  </div>
                  <div className="info-item">
                    <div className="buffer-loader"></div>
                  </div>
                </div>
              </div>
              <div className="account-item">
                <div className="account-info">
                  <div className="info-item">
                    <label>{t("pro_gender")}</label>
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
                    <label>{t("pro_name")}</label>
                  </div>
                  {edit && (
                    <div className="info-item">
                      <input
                        type="text"
                        className="account-input"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                      />
                    </div>
                  )}
                  {!edit && (
                    <div className="info-item">
                      <p>{user.name}</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="account-item">
                <div className="account-info">
                  <div className="info-item">
                    <label>{t("pro_username")}</label>
                  </div>
                  {edit && (
                    <div className="info-item">
                      <input
                        type="text"
                        className="account-input"
                        value={username}
                        onChange={(e) => {
                          setUsername(e.target.value);
                        }}
                      />
                    </div>
                  )}
                  {!edit && (
                    <div className="info-item">
                      <p>{user.username}</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="account-item">
                <div className="account-info">
                  <div className="info-item">
                    <label>{t("pro_email")}</label>
                  </div>
                  {edit && (
                    <div className="info-item">
                      <input
                        type="email"
                        className="account-input"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />
                    </div>
                  )}
                  {!edit && (
                    <div className="info-item">
                      <p>{user.email}</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="account-item">
                <div className="account-info">
                  <div className="info-item">
                    <label>{t("pro_num")}</label>
                  </div>
                  {edit && (
                    <div className="info-item phone">
                      <select
                        className="account-input code"
                        value={countryCode}
                        onChange={(e) => {
                          setCountryCode(e.target.value);
                        }}
                      >
                        {countries.map((country) => (
                          <option key={country.name} value={country.dial_code}>
                            {country.dial_code} ({country.name})
                          </option>
                        ))}
                      </select>
                      <input
                        type="text"
                        className="account-input"
                        value={tmp_number}
                        onChange={(e) => {
                          setTmpNumber(e.target.value);
                        }}
                      />
                    </div>
                  )}
                  {!edit && (
                    <div className="info-item">
                      <p>{user_details.phone_number}</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="account-item">
                <div className="account-info">
                  <div className="info-item">
                    <label>{t("pro_dob")}</label>
                  </div>
                  {edit && (
                    <div className="info-item">
                      <input
                        type="date"
                        className="account-input"
                        value={dob}
                        onChange={(e) => {
                          setDob(e.target.value);
                        }}
                      />
                    </div>
                  )}
                  {!edit && (
                    <div className="info-item">
                      <p>{formatDate(user.dob)}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="account-item">
                <div className="account-info">
                  <div className="info-item">
                    <label>{t("pro_gender")}</label>
                  </div>
                  {edit && (
                    <div className="info-item">
                      <select
                        className="account-input"
                        value={gender}
                        onChange={(e) => {
                          setGender(e.target.value);
                        }}
                      >
                        {gender === "Female" ? (
                          <>
                            <option value="Female">{t("female")}</option>
                            <option value="Male">{t("male")}</option>
                          </>
                        ) : (
                          <>
                            <option value="Male">{t("male")}</option>
                            <option value="Female">{t("female")}</option>
                          </>
                        )}
                      </select>
                    </div>
                  )}
                  {!edit && (
                    <div className="info-item">
                      <p>{user.gender}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
