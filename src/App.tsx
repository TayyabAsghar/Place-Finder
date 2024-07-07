
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LogInPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
