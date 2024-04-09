import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/home.tsx";
import LoginPage from "../pages/login.tsx";
import RegisterPage from "../pages/register.tsx";

function RoutesHandler() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/website" element={<HomePage />} />
        <Route path="/website/login" element={<LoginPage />} />
        <Route path="/website/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesHandler;
