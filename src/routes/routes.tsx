import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/home.tsx";
import RegisterPage from "../pages/register.tsx";

function RoutesHandler() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesHandler;
