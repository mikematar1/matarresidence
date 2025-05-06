import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import ReactModal from "react-modal";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// Components
import Login from "./Components/Auth/Login";
import Signup from "./Components/Auth/Signup";
import ForgotPassword from "./Components/Auth/ForgotPassword";
import Home from "./Components/Home/Home";
import Rooms from "./Components/Rooms/Rooms";
import RoomsItem from "./Components/Rooms/RoomsItem";
import Book from "./Components/Rooms/Book";
import Payment from "./Components/Rooms/Payment";
import Services from "./Components/Services/Services";
import FindUs from "./Components/FindUs/FindUs";
import FAQ from "./Components/Policies/FAQ";
import Policy from "./Components/Policies/Policy";
import Discover from "./Components/Discover/Discover";
import Contact from "./Components/Contact/Contact";
import BookingSubmitted from "./Components/Submit/BookingSubmitted";
import FeedbackSubmitted from "./Components/Submit/FeedbackSubmitted";
import MaintenanceSubmitted from "./Components/Submit/MaintenanceSubmitted";

import Navbar from "./Components/Navbar/Navbar";
import Account from "./Components/Account/Account";
import AccountNav from "./Components/Navbar/AccountNav";
import Feedback from "./Components/Feedback/Feedback";
import Reservation from "./Components/Account/Reservation";
import PrivateRoute from "./Routes/PrivateRoute";

import Profile from "./Components/Account/Profile";
import Preferences from "./Components/Account/Preferences";
import Security from "./Components/Account/Security";

import ScrollToTop from "./Global/Function/ScrollToTop";
import PageNotFound from "./Global/Components/PageNotFound";

const queryClient = new QueryClient();
ReactModal.setAppElement("#root");
function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/reset" element={<ForgotPassword />} />
            <Route
              path="/"
              element={
                <>
                  <ScrollToTop />
                  <Navbar />
                  <Home />
                </>
              }
            />
            <Route
              path="/rooms"
              element={
                <>
                  <ScrollToTop />
                  <Navbar />
                  <Rooms />
                </>
              }
            />
            <Route
              path="/rooms/:roomname"
              element={
                <>
                  <ScrollToTop />
                  <RoomsItem />
                </>
              }
            />
            <Route
              path="/feedback"
              element={
                <>
                  <ScrollToTop />
                  <Feedback />
                </>
              }
            />
            <Route
              path="/FAQ"
              element={
                <>
                  <ScrollToTop />
                  <FAQ />
                </>
              }
            />
            <Route
              path="/privacypolicies"
              element={
                <>
                  <ScrollToTop />
                  <Policy />
                </>
              }
            />
            <Route exact path="/" element={<PrivateRoute />}>
              <Route
                path="/rooms/booking"
                element={
                  <>
                    <ScrollToTop />
                    <Book />
                  </>
                }
              />
            </Route>

            <Route exact path="/" element={<PrivateRoute />}>
              <Route
                path="/submit"
                element={
                  <>
                    <ScrollToTop />
                    <BookingSubmitted />
                  </>
                }
              />
            </Route>
            <Route exact path="/" element={<PrivateRoute />}>
              <Route
                path="/maintenance/submit"
                element={
                  <>
                    <ScrollToTop />
                    <MaintenanceSubmitted />
                  </>
                }
              />
            </Route>
            <Route exact path="/" element={<PrivateRoute />}>
              <Route
                path="/feedback/submit"
                element={
                  <>
                    <ScrollToTop />
                    <FeedbackSubmitted />
                  </>
                }
              />
            </Route>
            <Route exact path="/" element={<PrivateRoute />}>
              <Route
                path="/rooms/payment"
                element={
                  <>
                    <ScrollToTop />
                    <Payment />
                  </>
                }
              />
            </Route>
            <Route
              path="/services"
              element={
                <>
                  <ScrollToTop />
                  <Navbar />
                  <Services />
                </>
              }
            />
            <Route exact path="/" element={<PrivateRoute />}>
              <Route
                path="/reservations/edit"
                element={
                  <>
                    <ScrollToTop />
                    <Reservation />
                  </>
                }
              />
            </Route>
            <Route
              path="/discover"
              element={
                <>
                  <ScrollToTop />
                  <Navbar />
                  <Discover />
                </>
              }
            />
            <Route
              path="/contact"
              element={
                <>
                  <ScrollToTop />
                  <Navbar />
                  <Contact />
                </>
              }
            />
            <Route exact path="/" element={<PrivateRoute />}>
              <Route
                path="/account"
                element={
                  <>
                    <ScrollToTop />
                    <AccountNav />
                    <Account />
                  </>
                }
              />
            </Route>
            <Route exact path="/" element={<PrivateRoute />}>
              <Route
                path="/account/profile"
                element={
                  <>
                    <ScrollToTop />
                    <AccountNav />
                    <Profile />
                  </>
                }
              />
            </Route>
            <Route exact path="/" element={<PrivateRoute />}>
              <Route
                path="/account/preferences"
                element={
                  <>
                    <ScrollToTop />
                    <AccountNav />
                    <Preferences />
                  </>
                }
              />
            </Route>
            <Route exact path="/" element={<PrivateRoute />}>
              <Route
                path="/account/security"
                element={
                  <>
                    <ScrollToTop />
                    <AccountNav />
                    <Security />
                  </>
                }
              />
            </Route>
            <Route
              path="*"
              element={
                <>
                  <ScrollToTop />
                  <PageNotFound />
                </>
              }
            />
          </Routes>
        </div>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
