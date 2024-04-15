import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ShareIcon from "@mui/icons-material/Share";

/**
 * MarkerOverlayProps interface for the MarkerOverlay component
 */
interface MarkerOverlayProps {
  markerID: number;
  closeOverlay: () => void;
}

/**
 * MarkerOverlay component displays an overlay with sensor data when a marker is clicked
 * @param markerID - Unique id for the selected marker
 * @param closeOverlay - Function to close the overlay from Map.tsx
 * @returns MarkerOverlay component
 */
const MarkerOverlay: React.FC<MarkerOverlayProps> = ({
  markerID,
  closeOverlay,
}) => {
  // State for marker data so the overlay can be updated
  const [markerData, setMarkerData] = useState({
    sensorName: "",
    image: "",
    sensorTypes: "",
    lastUpdated: "",
  });

  // Fetch marker data only once on component mount
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:8080/map/${markerID}`);
      const data = await response.json();
      setMarkerData(data);
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <Box
      sx={{ width: 225, height: 325, bgcolor: "white", borderRadius: "16px" }}
    >
      <Grid container>
        <Grid
          item
          xs={10}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ fontFamily: "Outfit" }}
          >
            {markerData.sensorName}
          </Typography>
        </Grid>
        <Grid item xs={2} sx={{ cursor: "pointer" }}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <HighlightOffIcon onClick={closeOverlay} />
          </Box>
        </Grid>
      </Grid>
      <Box
        component="img"
        sx={{
          height: "50%",
          width: "100%",
        }}
        alt="Sensor image"
        src={markerData.image}
      />
      <Grid container direction="row" justifyContent="space-between">
        <Grid item xs={3}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            sx={{ cursor: "pointer" }}
          >
            <QueryStatsIcon />
            <Typography
              variant="caption"
              sx={{ fontFamily: "Outfit", fontSize: "8px" }}
            >
              Stats
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            sx={{ cursor: "pointer" }}
          >
            <BookmarkBorderIcon />
            <Typography
              variant="caption"
              sx={{ fontFamily: "Outfit", fontSize: "8px" }}
            >
              Bookmark
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            sx={{ cursor: "pointer" }}
          >
            <FileDownloadIcon />
            <Typography
              variant="caption"
              sx={{ fontFamily: "Outfit", fontSize: "8px" }}
            >
              Download
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            sx={{ cursor: "pointer" }}
          >
            <ShareIcon />
            <Typography
              variant="caption"
              sx={{ fontFamily: "Outfit", fontSize: "8px" }}
            >
              Share
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MarkerOverlay;
