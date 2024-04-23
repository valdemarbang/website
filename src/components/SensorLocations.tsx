import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { Grid } from "@mui/material";

interface locationsData {
  countryFlag: string;
  countryName: string;
  sensorAmount: number;
}

type MapBounds = {
  ne: [number, number];
  sw: [number, number];
};

function SensorLocations({ mapBounds }: { mapBounds: MapBounds }) {
  /**
   * Fetch sensor locations data from the server when the component is mounted
   */
  const [sensorLocations, setSensorLocations] = useState<locationsData[]>([]);
  const totalSensors = sensorLocations.reduce(
    (sum, location) => sum + Number(location.sensorAmount),
    0
  );

  useEffect(() => {
    const mapBoundsString = `ne=${mapBounds.ne.join(
      ","
    )}&sw=${mapBounds.sw.join(",")}`;
    fetch(`http://localhost:8080/sensorlocations/${mapBoundsString}`)
      .then((response) => response.json())
      .then((data: { locations: locationsData[] }) => {
        setSensorLocations(data.locations);
      })
      .catch((error) => console.error("Error:", error));
  }, [mapBounds.ne, mapBounds.sw]);

  return (
    <Box sx={{ backgroundColor: "white", opacity: 0.8, maxWidth: "200px" }}>
      <Grid container>
        <Grid
          item
          xs={12}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Typography sx={{ fontFamily: "Outfit", fontSize: "16px" }}>
            Current Sensor Countries
          </Typography>
        </Grid>
        <Grid container rowSpacing={2}>
          {sensorLocations.map((location) => (
            <>
              <Grid item xs={3}>
                <Box
                  component="img"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  sx={{
                    height: "20px",
                    width: "40px",
                    margin: "auto",
                  }}
                  alt={location.countryName}
                  src={location.countryFlag}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography sx={{ fontFamily: "Inter", fontSize: "14px" }}>
                  {location.countryName}
                </Typography>
              </Grid>
              <Grid
                item
                xs={3}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Typography sx={{ fontFamily: "Inter", fontSize: "14px" }}>
                  {location.sensorAmount}
                </Typography>
              </Grid>
            </>
          ))}
          <Grid
            item
            xs={12}
            display="flex"
            justifyContent="center"
            alignItems="flex-end"
          >
            <Typography sx={{ fontFamily: "Inter", fontSize: "15px" }}>
              Total sensors: {totalSensors}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SensorLocations;
