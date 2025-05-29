import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// MUI
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

//APIs
import FetchCred from "../../api-client/Auth/FetchCred";

const theme = createTheme({
  palette: {
    primary: {
      light: "#2a3249",
      main: "#2a3249",
      contrastText: "#fff",
    },
  },
});

const Login = () => {
  const navigation = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  //Validators
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  //Submit
  const handleSubmit = (event) => {
    event.preventDefault();
    setErr("");
    if (!validateEmail(email)) {
      setErr("Please enter a valid email address");
      return;
    }

    if (!validatePassword(password)) {
      setErr("Please enter a password with at least 8 characters");
      return;
    }

    const data = { email, password };
    let response = FetchCred(data);
    response.then((res) => {
      if (res.data.status === "error") {
        setErr("Wrong credentials, Try again");
      } else {
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
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Add hotel logo here */}
          <h1 className="no-cursor">Log in</h1>
          <form onSubmit={handleSubmit}>
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
            <div className="login-forgot">
              <div className="link" onClick={() => navigation("/reset")}>
                Forgot password?
              </div>
            </div>
            <div className="login-error">{err}</div>
            <button type="submit" className="btn-primary">
              Log in
            </button>
          </form>
          <Grid container>
            <Grid item xs>
              <div className="login-signup">
                <div className="no-cursor"> Don't have an account?&nbsp;</div>
                <div className="link" onClick={() => navigation("/signup")}>
                  Sign up
                </div>
              </div>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
