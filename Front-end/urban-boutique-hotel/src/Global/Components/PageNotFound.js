import { Box, Button, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useTranslation } from "react-i18next";

import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";

export default function PageNotFound() {
  const { t, i18n } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem("Translate"));
  }, []);
  const navigate = useNavigate();
  const Back = () => {
    navigate(-1);
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        color: "#2a3249",
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid xs={6}>
            <Typography variant="h1">404</Typography>
            <Typography variant="h6">{t("pagenotfound")}</Typography>
            <Link
              onClick={Back}
              style={{ color: "#aca0a0", fontSize: "1.1em" }}
            >
              {t("goback")}
            </Link>
          </Grid>
          <Grid xs={6}>
            <img
              src="https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569__340.jpg"
              alt="404 not found"
              width={500}
              height={250}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
