import { lazy, Suspense } from "react";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import Loader from "./components/Loader";
import { HideNavBar } from "./lib/constants";
import useNotification from "./hooks/useNotification";
import ProtectedRoute from "./components/ProtectedRoute";
import CustomNotification from "./components/CustomNotification";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

const HomePage = lazy(() => import("./pages/HomePage"));
const AuthPage = lazy(() => import("./pages/AuthPage"));
const LogInPage = lazy(() => import("./pages/LogInPage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const SearchPage = lazy(() => import("./pages/SearchPage"));
const PageNotFond = lazy(() => import("./pages/PageNotFond"));
const TripListPage = lazy(() => import("./pages/TripListPage"));
const WishListPage = lazy(() => import("./pages/WishListPage"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const WishDetailsPage = lazy(() => import("./pages/WishDetailsPage"));
const TripDetailsPage = lazy(() => import("./pages/TripDetailsPage"));
const PropertyListPage = lazy(() => import("./pages/PropertyListPage"));
const CreateListingPage = lazy(() => import("./pages/CreateListingPage"));
const ListingDetailsPage = lazy(() => import("./pages/ListingDetailsPage"));
const ReservationListPage = lazy(() => import("./pages/ReservationListPage"));
const PropertyDetailsPage = lazy(() => import("./pages/PropertyDetailsPage"));
const ReservationDetailsPage = lazy(() => import("./pages/ReservationDetailsPage"));

const App = () => {
  const location = useLocation();
  const { notification } = useNotification();

  return (
    <div className="flex flex-col min-h-screen">
      {!HideNavBar.includes(location.pathname) && <NavBar />}
      <main className="flex flex-col grow justify-center items-center w-full">
        <CustomNotification {...notification} />
        <Suspense fallback={<Loader />}>
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
              <Route path="/create-listing" element={<CreateListingPage />} />
              <Route path="/user/properties" element={<PropertyListPage />} />
              <Route path="/user/trips/:tripId" element={<TripDetailsPage />} />
              <Route path="/user/wishes/:wishId" element={<WishDetailsPage />} />
              <Route path="/user/reservations" element={<ReservationListPage />} />
              <Route path="/user/properties/:propId" element={<PropertyDetailsPage />} />
              <Route path="/user/reservations/:resId" element={<ReservationDetailsPage />} />
            </Route>
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default App;