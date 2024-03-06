import { useState } from "react";
import Button from "@mui/material/Button";
import logo from "./assets/blhub-logo.svg";
import TopBar from "./components/TopBar.tsx";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <TopBar />
    </>
  );
}

export default App;
