import { HashRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/home.tsx";
import LoginPage from "../pages/login.tsx";
import RegisterPage from "../pages/register.tsx";

function RoutesHandler() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </HashRouter>
  );
}

export default RoutesHandler;
