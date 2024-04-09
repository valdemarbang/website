import { Map, ZoomControl } from "pigeon-maps";
import Box from "@mui/material/Box";

function MapComponent() {
  const linkoping: [number, number] = [58.4, 15.625278];

  return (
    <Box sx={{ height: 1, width: 1 }}>
      <Map defaultCenter={linkoping} defaultZoom={3}>
        <ZoomControl />
      </Map>
    </Box>
  );
}

export default MapComponent;
