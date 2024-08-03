import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import SearchPage from "./pages/SearchPage";
import PageNotFond from "./pages/PageNotFond";
import WishListPage from "./pages/WishListPage";
import TripListPage from "./pages/TripListPage";
import CategoryPage from "./pages/CategoryPage";
import TripDetailsPage from "./pages/TripDetailsPage";
import WishDetailsPage from "./pages/WishDetailsPage";
import CreateListing from "./pages/CreateListingPage";
import useNotification from "./hooks/useNotification";
import PropertyListPage from "./pages/PropertyListPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { Routes, Route, Navigate } from "react-router-dom";
import ListingDetailsPage from "./pages/ListingDetailsPage";
import PropertyDetailsPage from "./pages/PropertyDetailsPage";
import ReservationListPage from "./pages/ReservationListPage";
import CustomNotification from "./components/CustomNotification";
import ReservationDetailsPage from "./pages/ReservationDetailsPage";

const App = () => {
  const { notification } = useNotification();

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex flex-col grow justify-center items-center w-full">
        <CustomNotification {...notification} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/404" element={<PageNotFond />} />
          <Route path="*" element={<Navigate to="/404" />} />
          <Route path="/listing/search" element={<SearchPage />} />
          <Route path="/listing/:listingId" element={<ListingDetailsPage />} />
          <Route path="/listing/category/:category" element={<CategoryPage />} />
          <Route element={<AuthPage />}>
            <Route path="/login" element={<LogInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
          </Route>
          <Route element={<ProtectedRoute />} >
            <Route path="/user/trips" element={<TripListPage />} />
            <Route path="/user/wishes" element={<WishListPage />} />
            <Route path="/create-listing" element={<CreateListing />} />
            <Route path="/user/properties" element={<PropertyListPage />} />
            <Route path="/user/trips/:tripId" element={<TripDetailsPage />} />
            <Route path="/user/wishes/:wishId" element={<WishDetailsPage />} />
            <Route path="/user/reservations" element={<ReservationListPage />} />
            <Route path="/user/properties/:propId" element={<PropertyDetailsPage />} />
            <Route path="/user/reservations/:resId" element={<ReservationDetailsPage />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
