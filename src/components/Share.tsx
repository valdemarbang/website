import copy from "copy-to-clipboard";
import { Box } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import Typography from "@mui/material/Typography";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * ShareProps interface for the Share component
 */
interface shareProps {
  markerID: number;
  sxDesign: string;
}

/**
 * Share component displays a share button to download the marker data
 */
function Share({ markerID, sxDesign }: shareProps) {
  const currentHost = `${window.location.protocol}//${window.location.hostname}`;
  

  const handleShare = () => {
    copy(`${currentHost}/analytics/${markerID}`);
    toast.success("Link copied to clipboard", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={sxDesign}
      onClick={handleShare}
    >
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ShareIcon />
      <Typography
        variant="caption"
        sx={{ fontFamily: "Outfit", fontSize: "8px" }}
      >
        Share
      </Typography>
    </Box>
  );
}

export default Share;
