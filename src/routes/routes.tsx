import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/home.tsx";
import RegisterPage from "../pages/register.tsx";

function RoutesHandler() {
  let url = "https://tddd96-g11-blhub.github.io/website";
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    url = "";
  }

  return (
    <BrowserRouter basename={url}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesHandler;
