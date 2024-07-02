
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="w-screens h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
