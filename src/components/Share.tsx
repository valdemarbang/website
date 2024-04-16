import copy from "copy-to-clipboard";
import { Box } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import Typography from "@mui/material/Typography";
import SuccessAlert from "./SuccessAlert";
import { useState } from "react";

/**
 * ShareProps interface for the Share component
 */
interface shareProps {
  markerID: number;
  sxDesign: any;
}

/**
 * Share component displays a share button to download the marker data
 */
function Share({ markerID, sxDesign }: shareProps) {
  const currentHost = `${window.location.protocol}//${window.location.hostname}`;
  const [alertOpen, setAlertOpen] = useState(false);

  const handleShare = () => {
    copy(`${currentHost}/analytics/${markerID}`);
    setAlertOpen(true);
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };
  
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={sxDesign}
      onClick={handleShare}
    >
      <SuccessAlert
        open={alertOpen}
        onClose={handleCloseAlert}
        message={"Link copied to clipboard"}
      />
      <ShareIcon />
      <Typography
        variant="caption"
        sx={{ fontFamily: "Outfit", fontSize: "8px" }}
      >
        Download
      </Typography>
    </Box>
  );
}

export default Share;
