import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import SearchPage from "./pages/SearchPage";
import WishListPage from "./pages/WishListPage";
import TripListPage from "./pages/TripListPage";
import CategoryPage from "./pages/CategoryPage";
import TripDetailsPage from "./pages/TripDetailsPage";
import WishDetailsPage from "./pages/WishDetailsPage";
import CreateListing from "./pages/CreateListingPage";
import PropertyListPage from "./pages/PropertyListPage";
import ListingDetailsPage from "./pages/ListingDetailsPage";
import { Routes, Route, useLocation } from "react-router-dom";
import PropertyDetailsPage from "./pages/PropertyDetailsPage";
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
          <Route path="/user/wishes" element={<WishListPage />} />
          <Route path="/listing/search" element={<SearchPage />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/user/properties" element={<PropertyListPage />} />
          <Route path="/user/trips/:tripId" element={<TripDetailsPage />} />
          <Route path="/user/wishes/:wishId" element={<WishDetailsPage />} />
          <Route path="/listing/:listingId" element={<ListingDetailsPage />} />
          <Route path="/user/reservations" element={<ReservationListPage />} />
          <Route path="/listing/category/:category" element={<CategoryPage />} />
          <Route path="/user/properties/:propId" element={<PropertyDetailsPage />} />
          <Route path="/user/reservations/:resId" element={<ReservationDetailsPage />} />
        </Routes>
      </main>
      {!hideFooter.includes(location.pathname) && <Footer />}
    </div>
  );
};

export default App;
