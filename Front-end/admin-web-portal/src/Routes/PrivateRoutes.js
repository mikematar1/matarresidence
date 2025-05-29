import { Navigate, Outlet } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useEffect } from "react";

const PrivateRoute = () => {
	//Token handler
	const token = localStorage.getItem("token");
	useEffect(() => {
		const shouldReload = localStorage.getItem("shouldReload");
		if (shouldReload === "true") {
			localStorage.removeItem("shouldReload");
			window.location.reload(true);
		}
	}, []);
	if (token) {
		const decoded = jwt_decode(token);
		const currentTime = Date.now() / 1000; // Convert to seconds

		if (decoded.exp < currentTime) {
			localStorage.removeItem("token");
			localStorage.setItem("shouldReload", "true");
		}
	}

	return token ? <Outlet /> : <Navigate to='/login' replace={true} />;
};

export default PrivateRoute;
