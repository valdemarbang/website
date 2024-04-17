/*
    Homepage for BlueHub
*/
import { useEffect, useState } from "react";
import RootPage from "./root.tsx";
import Map from "../components/Map.tsx";
import SuccessAlert from "../components/SuccessAlert.tsx";
import { Box } from "@mui/material";

function HomePage() {
  // Display a success message from register or login success
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  useEffect(() => {
    const msg = window.localStorage.getItem("successMsg");
    if (msg) {
      setSuccessMsg(msg);
      window.localStorage.removeItem("successMsg"); // Remove the message from localStorage after retrieving
    }
  }, []);

  return (
    <>
      {successMsg && <SuccessAlert open={true} message={successMsg} />}
      <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <RootPage />
        <Map />
      </Box>
    </>
  );
}

export default HomePage;
