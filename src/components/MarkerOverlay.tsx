import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import { useNavigate } from "react-router-dom";
import Bookmark from "./Bookmark.tsx";
import Download from "./Download.tsx";
import Share from "./Share.tsx";

/**
 * MarkerData interface for the MarkerOverlay component
 */
interface MarkerData {
  sensorID: number;
  sensorName: string;
  sensorImage: string;
  sensorTypes: [{ type: string; unit: string }];
  lastUpdated: string;
}

/**
 * MarkerOverlayProps interface for the MarkerOverlay component
 */
interface MarkerOverlayProps {
  markerData: MarkerData;
  closeOverlay: () => void;
}

/**
 * MarkerOverlay component displays an overlay with sensor data when a marker is clicked
 * @param markerID - Unique id for the selected marker
 * @param closeOverlay - Function to close the overlay from Map.tsx
 * @returns MarkerOverlay component
 */
const MarkerOverlay: React.FC<MarkerOverlayProps> = ({
  markerData,
  closeOverlay,
}) => {
  const { sensorID, sensorName, sensorImage, sensorTypes, lastUpdated } =
    markerData;
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        bgcolor: "white",
        borderRadius: "16px",
        maxWidth: "225px",
      }}
    >
      <Grid container>
        <Grid
          item
          xs={10}
          display="flex"
          justifyContent="left"
          alignItems="left"
        >
          <Typography
            fontSize={15}
            color="text.secondary"
            sx={{ fontFamily: "Outfit", ml: 1 }}
          >
            {sensorName}
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
        <Grid
          item
          xs={12}
          display="flex"
          justifyContent="left"
          alignItems="left"
        >
          <Typography
            fontSize={10}
            color="grey"
            sx={{ fontFamily: "Inter", ml: 1 }}
          >
            Last updated:&nbsp;
            {lastUpdated}
          </Typography>
        </Grid>
      </Grid>
      <Box
        component="img"
        sx={{
          height: "150px",
          width: "225px",
          margin: "auto",
        }}
        alt="Sensor image"
        src={sensorImage}
      />
      <Typography
        variant="h6"
        color="text.secondary"
        sx={{ textAlign: "center", fontFamily: "Outfit" }}
      >
        Sensor data
      </Typography>
      <Grid container spacing={2}>
        {sensorTypes.map(
          (sensorType: { type: string; unit: string }, index: number) => (
            <Grid item xs={6} key={index}>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                sx={{ cursor: "pointer" }}
              >
                <Typography fontSize="11px">{sensorType.type}</Typography>
                <Typography fontSize="11px">{sensorType.unit}</Typography>
              </Box>
            </Grid>
          )
        )}
      </Grid>
      <Grid
        container
        direction="row"
        alignItems="flex-end"
        justifyContent="space-evenly"
      >
        <Grid item xs={3}>
          <Box
            onClick={() => navigate("/analytics/" + sensorID)}
            display="flex"
            flexDirection="column"
            alignItems="center"
            sx={{ cursor: "pointer", borderTop: 1, borderRight: 1 }}
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
          <Bookmark
            markerID={sensorID}
            userID={1}
            sxDesign={{ cursor: "pointer", borderTop: 1, borderRight: 1 }}
          />
        </Grid>
        <Grid item xs={3}>
          <Download
            markerID={sensorID}
            sensorName={sensorName}
            sxDesign={{ cursor: "pointer", borderTop: 1, borderRight: 1 }}
          />
        </Grid>
        <Grid item xs={3}>
          <Share
            markerID={sensorID}
            sxDesign={{ cursor: "pointer", borderTop: 1 }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default MarkerOverlay;
