import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

function MarkerOverlay({ markerID }: { markerID: number }) {
  // Fetch marker data from backend
  const fetchMarkerData = async () => {
    const response = await fetch(`http://localhost:8080/map/${markerID}`);
    const data = await response.json();
    return data;
  };

  // State for marker data so the overlay can be updated
  const [markerData, setMarkerData] = useState({ name: "", description: "" });

  // Fetch marker data only once on component mount
  useEffect(() => {
    fetchMarkerData().then((data) => {
      setMarkerData(data);
    });
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <Box
      sx={{ width: 200, height: 200, bgcolor: "white", borderRadius: "16px" }}
    >
      <Grid container spacing={1}>
        <Grid item xs={10} display="flex" justifyContent="center" alignItems="center">
          <Typography variant="h6" color="text.secondary">
            {markerData.name}
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <CloseIcon />
        </Grid>
      </Grid>
      <p>{markerData.description}</p>
    </Box>
  );
}

export default MarkerOverlay;
