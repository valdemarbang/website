/*
    Homepage for BlueHub
*/
import { useEffect, useState } from 'react';
import RootPage from "./root.tsx";
import Map from "../components/Map.tsx";
import SideBar from "../components/SideBar.tsx";
import SuccessAlert from '../components/SuccessAlert.tsx';

function HomePage() {
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  useEffect(() => {
    const msg = window.localStorage.getItem('successMsg');
    if (msg) {
      setSuccessMsg(msg);
      window.localStorage.removeItem('successMsg'); // Remove the message from localStorage after retrieving
    }
  }, []);

  return (
    <>
      {successMsg && <SuccessAlert open={true} onClose={() => setSuccessMsg(null)} message={successMsg} />}
      <RootPage />
      <SideBar />
      <Map />
    </>
  );
}

export default HomePage;
