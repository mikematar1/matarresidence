// MUI
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useNavigate } from "react-router-dom";

const theme = createTheme({
	palette: {
		primary: {
			light: "#2a3249",
			main: "#2a3249",
			contrastText: "#fff",
		},
	},
});

const ForgotPassword = () => {
	const navigation = useNavigate();

	function handleSubmit() {
		navigation("/login");
	}

	return (
		<ThemeProvider theme={theme}>
			<Container component='main' maxWidth='xs'>
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}>
					<h1 className='auth-header'>Forgot Password</h1>
					<h4 className='auth-description'>
						If you have forgotten your password, enter your email address below
						and we'll send you a link to reset it.
					</h4>
					<form onSubmit={handleSubmit}>
						<TextField
							margin='normal'
							fullWidth
							id='email'
							label='Email Address'
							autoComplete='email'
							autoFocus
						/>
						<button type='submit' className='btn-primary'>
							Submit
						</button>
					</form>
					<Grid container>
						<Grid item xs>
							<div className='link' onClick={() => navigation("/login")}>
								Back to log in
							</div>
						</Grid>
					</Grid>
				</Box>
			</Container>
		</ThemeProvider>
	);
};

export default ForgotPassword;
