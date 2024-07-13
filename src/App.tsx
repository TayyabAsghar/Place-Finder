
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import Listings from "./components/Listings";
import CreateListing from "./pages/CreateListingPage";
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
            <Route path="/listings:listingId" element={<Listings />} />
            <Route path="/create-listing" element={<CreateListing />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
};

export default App;
