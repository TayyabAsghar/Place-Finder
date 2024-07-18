import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import TripListPage from "./pages/TripListPage";
import TripDetailsPage from "./pages/TripDetailsPage";
import CreateListing from "./pages/CreateListingPage";
import ListingDetailsPage from "./pages/ListingDetailsPage";
import { Routes, Route, useLocation } from "react-router-dom";
import ReservationListPage from "./pages/ReservationListPage";
import ReservationDetailsPage from "./pages/ReservationDetailsPage";

const App = () => {
  const location = useLocation();
  const hideFooter = ['/login', '/signup'];

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex flex-col grow justify-center items-center w-full">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/user/trips" element={<TripListPage />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/user/trips/:tripId" element={<TripDetailsPage />} />
          <Route path="/listing/:listingId" element={<ListingDetailsPage />} />
          <Route path="/user/reservations" element={<ReservationListPage />} />
          <Route path="/user/reservations/:resId" element={<ReservationDetailsPage />} />
        </Routes>
      </main>
      {!hideFooter.includes(location.pathname) && <Footer />}
    </div>
  );
};

export default App;
