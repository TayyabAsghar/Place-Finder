
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import TripListPage from "./pages/TripListPage";
import TripDetailsPage from "./pages/TripDetailsPage";
import CreateListing from "./pages/CreateListingPage";
import ListingDetailsPage from "./pages/ListingDetailsPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <BrowserRouter>
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
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
};

export default App;
