import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// MUI
import countries from "../../Global/Components/CountryCodes";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";

//APIs
import Register from "../../api-client/Auth/Register";

const theme = createTheme({
  palette: {
    primary: {
      light: "#2a3249",
      main: "#2a3249",
      contrastText: "#fff",
    },
  },
});

const Signup = () => {
  const navigation = useNavigate();

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [countryCode, setCountryCode] = useState("+1");
  const [tmp_number, setTmpNumber] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [err, setErr] = useState("");

  //Validators
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  const validatePassword = (password) => {
    return password.length >= 8;
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
      const birthYear = inputDate.getFullYear();
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

  const handleSubmit = (event) => {
    event.preventDefault();
    setErr("");
    if (!validateUsername(username)) {
      if (username.length === 0) {
        setErr("Username field required");
      } else {
        setErr("Please enter a username that is not too long");
      }
      return;
    }
    if (!validateName(name)) {
      setErr("Name field required");
      return;
    }
    if (!validateEmail(email)) {
      setErr("Please enter a valid email address");
      return;
    }
    if (!validatePassword(password)) {
      setErr("Please enter a password with at least 8 characters");
      return;
    }
    if (!validatePhoneNumber(tmp_number)) {
      setErr("Please enter a valid phone number");
      return;
    }
    if (!validateDate(dob)) {
      setErr("Invalid date of birth");
      return;
    }
    if (!gender) {
      setErr("Please select a gender");
      return;
    }
    const phone_number = countryCode + " " + tmp_number;
    const type = 0;
    const data = {
      username,
      name,
      email,
      password,
      gender,
      dob,
      gender,
      phone_number,
      type,
    };
    let response = Register(data);
    response.then((res) => {
      if (res.status === 422) {
        setErr("The email has already been taken");
      } else {
        console.log(res.data);
        let token = res.data.authorisation.token;
        localStorage.setItem("token", "Bearer " + token);
        localStorage.setItem(
          "username",
          JSON.stringify(res.data.user.username)
        );
        localStorage.setItem("shouldReload", JSON.stringify(true));
        axios.defaults.headers.common["Authorization"] = "Bearer" + token;
        navigation("/", { replace: true });
      }
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "-2em",
          }}
        >
          {/* Add hotel logo here */}
          <h1 className="no-cursor">Sign up</h1>
          <form onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              fullWidth
              id="name"
              label="Name"
              autoComplete="name"
              autoFocus
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <TextField
              margin="normal"
              fullWidth
              id="username"
              label="Username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <Box sx={{ display: "flex" }}>
              <TextField
                margin="normal"
                id="tmp_number_country_code"
                label="Country Code"
                select
                sx={{ minWidth: 100, mr: 1 }}
                SelectProps={{
                  MenuProps: {
                    PaperProps: {
                      style: {
                        maxHeight: "300px",
                        width: "250px",
                        fontSize: "13px",
                      },
                    },
                  },
                  renderValue: (selected) => {
                    const selectedCountry = countries.find(
                      (item) => item.dial_code === selected
                    );
                    return selectedCountry
                      ? `${selectedCountry.dial_code}`
                      : "";
                  },
                }}
                value={countryCode}
                onChange={(event) => {
                  setCountryCode(event.target.value);
                }}
              >
                {countries.map((item) => {
                  return (
                    <MenuItem
                      key={item.name}
                      value={item.dial_code}
                      sx={{
                        width: "100%",
                        height: "30px",
                        fontSize: "13px",
                      }}
                    >
                      {`${item.dial_code} (${item.name})`}
                    </MenuItem>
                  );
                })}
              </TextField>

              <TextField
                margin="normal"
                fullWidth
                id="tmp_number"
                label="Phone Number"
                type="number"
                InputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                autoComplete="tmp_number"
                autoFocus
                value={tmp_number}
                onChange={(event) => setTmpNumber(event.target.value)}
              />
            </Box>
            <TextField
              margin="normal"
              fullWidth
              id="dob"
              label="Date of Birth"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              autoComplete="dob"
              autoFocus
              value={dob}
              onChange={(event) => setDob(event.target.value)}
            />
            <TextField
              margin="normal"
              fullWidth
              select
              id="gender"
              label="Gender"
              value={gender}
              onChange={(event) => setGender(event.target.value)}
              autoFocus
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </TextField>
            <div className="login-error">{err}</div>
            <button type="submit" className="btn-primary">
              Sign up
            </button>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Signup;
