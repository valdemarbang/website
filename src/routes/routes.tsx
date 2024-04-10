import { HashRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/home.tsx";
import RegisterPage from "../pages/register.tsx";

function RoutesHandler() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </HashRouter>
  );
}

export default RoutesHandler;
