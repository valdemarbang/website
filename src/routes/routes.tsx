import { HashRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/home.tsx";
import LoginPage from "../pages/login.tsx";
import RegisterPage from "../pages/register.tsx";
import AnalyticPage from "../pages/analytic.tsx";

function RoutesHandler() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/analytics" element={<AnalyticPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </HashRouter>
  );
}

export default RoutesHandler;
