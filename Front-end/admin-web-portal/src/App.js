import { BrowserRouter, Route, Routes } from "react-router-dom";

import ReactModal from "react-modal";

// Context
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Componenents
import Navbar from "./Componenents/NavBar/Navbar";

// ******** Login ********
import Login from "./Componenents/LogIn/Login";

// ******** Home ********
import Home from "./Componenents/Home/Home";

// ******** Employees ********
import Employees from "./Componenents/Employees/Employees";
import EmployeeItem from "./Componenents/Employees/EmployeeItem";

// ******** Reservations ********
import Reservations from "./Componenents/Reservations/Reservations";
import ReservationItem from "./Componenents/Reservations/ReservationItem";

// ******** Users ********
import Users from "./Componenents/Users/Users";
import UserItem from "./Componenents/Users/UserItem";

// ******** Support ********
import Support from "./Componenents/Support/Support";
// Reviews
import Reviews from "./Componenents/Support/Reviews/Reviews";
import ReviewItem from "./Componenents/Support/Reviews/ReviewItem";
//Feedback
import Feedback from "./Componenents/Support/Feedback/Feedback";
import FeedbackItem from "./Componenents/Support/Feedback/FeedbackItem";

// ******** Options ********
import Options from "./Componenents/Options/Options";
import Preferences from "./Componenents/Options/Preferences";
import PhotoGallery from "./Componenents/Options/PhotoGallery";
import FaqPolicyList from "./Componenents/Options/FaqPolicy/FaqPolicyList";
import FaqPolicyItem from "./Componenents/Options/FaqPolicy/FaqPolicyItem";
import RegulationDisasterList from "./Componenents/Options/RegulationDisaster/RegulationDisasterList";
import RegulationDisasterItem from "./Componenents/Options/RegulationDisaster/RegulationDisasterItem";
import EmailMarketing from "./Componenents/Options/EmailMarketing";

// ******** Finance ********
import Finance from "./Componenents/Finance/Finance";
import Transactions from "./Componenents/Finance/Transactions";

// ******** Rooms ********
import Rooms from "./Componenents/Rooms/Rooms";
import RoomItem from "./Componenents/Rooms/RoomItem";

// ******** Profile ********
import Profile from "./Componenents/Profile/Profile";

// ******** Global ********
import MaintenanceRequest from "./Global/Components/Maintenance Request/Requests";
import RequestItem from "./Global/Components/Maintenance Request/RequestItem";
import Scheduler from "./Global/Scheduler/Scheduler";

// ******** Private Routes ********
import PrivateRoute from "./Routes/PrivateRoutes";

ReactModal.setAppElement("#root");
const queryClient = new QueryClient();
function App() {
	return (
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<div className='App'>
					<Routes>
						<Route path='/login' element={<Login />} />
						<Route exact path='/' element={<PrivateRoute />}>
							<Route
								path='/'
								element={
									<>
										<Navbar />
										<Home />
									</>
								}
							/>
						</Route>
						<Route exact path='/' element={<PrivateRoute />}>
							<Route
								path='/options'
								element={
									<>
										<Navbar />
										<Options />
									</>
								}
							/>
						</Route>
						<Route exact path='/' element={<PrivateRoute />}>
							<Route
								path='/options/preferences'
								element={
									<>
										<Navbar />
										<Preferences />
									</>
								}
							/>
						</Route>
						<Route exact path='/' element={<PrivateRoute />}>
							<Route
								path='/options/gallery'
								element={
									<>
										<Navbar />
										<PhotoGallery />
									</>
								}
							/>
						</Route>
						<Route exact path='/' element={<PrivateRoute />}>
							<Route
								path='/options/marketing'
								element={
									<>
										<Navbar />
										<EmailMarketing />
									</>
								}
							/>
						</Route>
						<Route exact path='/' element={<PrivateRoute />}>
							<Route
								path='/options/faqs_policies'
								element={
									<>
										<Navbar />
										<FaqPolicyList />
									</>
								}
							/>
						</Route>
						<Route exact path='/' element={<PrivateRoute />}>
							<Route
								path='/options/faqs_policies/info'
								element={
									<>
										<Navbar />
										<FaqPolicyItem />
									</>
								}
							/>
						</Route>
						<Route exact path='/' element={<PrivateRoute />}>
							<Route
								path='/options/regulation_disaster'
								element={
									<>
										<Navbar />
										<RegulationDisasterList />
									</>
								}
							/>
						</Route>
						<Route exact path='/' element={<PrivateRoute />}>
							<Route
								path='/options/regulation_disaster/info'
								element={
									<>
										<Navbar />
										<RegulationDisasterItem />
									</>
								}
							/>
						</Route>
						<Route exact path='/' element={<PrivateRoute />}>
							<Route
								path='/calendar'
								element={
									<>
										<Navbar />
										<Scheduler />
									</>
								}
							/>
						</Route>
						<Route exact path='/' element={<PrivateRoute />}>
							<Route
								path='/rooms'
								element={
									<>
										<Navbar />
										<Rooms />
									</>
								}
							/>
						</Route>
						<Route exact path='/' element={<PrivateRoute />}>
							<Route
								path='/reservations'
								element={
									<>
										<Navbar />
										<Reservations />
									</>
								}
							/>
						</Route>
						<Route exact path='/' element={<PrivateRoute />}>
							<Route
								path='/reservations/info'
								element={
									<>
										<Navbar />
										<ReservationItem />
									</>
								}
							/>
						</Route>
						<Route exact path='/' element={<PrivateRoute />}>
							<Route
								path='/support'
								element={
									<>
										<Navbar />
										<Support />
									</>
								}
							/>
						</Route>
						<Route exact path='/' element={<PrivateRoute />}>
							<Route
								path='/support/reviews'
								element={
									<>
										<Navbar />
										<Reviews />
									</>
								}
							/>
						</Route>
						<Route exact path='/' element={<PrivateRoute />}>
							<Route
								path='/support/reviews/info'
								element={
									<>
										<Navbar />
										<ReviewItem />
									</>
								}
							/>
						</Route>
						<Route exact path='/' element={<PrivateRoute />}>
							<Route
								path='/support/feedback'
								element={
									<>
										<Navbar />
										<Feedback />
									</>
								}
							/>
						</Route>
						<Route exact path='/' element={<PrivateRoute />}>
							<Route
								path='/support/feedback/info'
								element={
									<>
										<Navbar />
										<FeedbackItem />
									</>
								}
							/>
						</Route>
						<Route exact path='/' element={<PrivateRoute />}>
							<Route
								path='/room/profile'
								element={
									<>
										<Navbar />
										<RoomItem />
									</>
								}
							/>
						</Route>
						<Route exact path='/' element={<PrivateRoute />}>
							<Route
								path='/maintenance/requests'
								element={
									<>
										<Navbar />
										<MaintenanceRequest />
									</>
								}
							/>
						</Route>
						<Route exact path='/' element={<PrivateRoute />}>
							<Route
								path='/maintenance/requests/info'
								element={
									<>
										<Navbar />
										<RequestItem />
									</>
								}
							/>
						</Route>
						<Route exact path='/' element={<PrivateRoute />}>
							<Route
								path='/users'
								element={
									<>
										<Navbar />
										<Users />
									</>
								}
							/>
						</Route>
						<Route exact path='/' element={<PrivateRoute />}>
							<Route
								path='/user/profile'
								element={
									<>
										<Navbar />
										<UserItem />
									</>
								}
							/>
						</Route>
						<Route exact path='/' element={<PrivateRoute />}>
							<Route
								path='/employees'
								element={
									<>
										<Navbar />
										<Employees />
									</>
								}
							/>
						</Route>
						<Route exact path='/' element={<PrivateRoute />}>
							<Route
								path='/employee/profile'
								element={
									<>
										<Navbar />
										<EmployeeItem />
									</>
								}
							/>
						</Route>
						<Route exact path='/finance' element={<PrivateRoute />}>
							<Route
								path='/finance'
								element={
									<>
										<Navbar />
										<Finance />
									</>
								}
							/>
						</Route>
						<Route exact path='/' element={<PrivateRoute />}>
							<Route
								path='/finance/transactions'
								element={
									<>
										<Navbar />
										<Transactions />
									</>
								}
							/>
						</Route>
						<Route exact path='/' element={<PrivateRoute />}>
							<Route
								path='/profile'
								element={
									<>
										<Navbar />
										<Profile />
									</>
								}
							/>
						</Route>
					</Routes>
				</div>
			</QueryClientProvider>
		</BrowserRouter>
	);
}

export default App;
