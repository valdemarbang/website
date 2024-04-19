import { useEffect, useState } from 'react';
import { Box } from "@mui/material";

interface locationsData {
    country: string;
    amount: number;
}

interface SensorLocationsProps {
    mapBounds : { ne: [number, number], sw: [number, number] };
}

function SensorLocations(props: SensorLocationsProps) {
    /**
     * Fetch sensor locations data from the server when the component is mounted
     */
    const [sensorLocations, setSensorLocations] = useState<locationsData[]>([]);

    useEffect(() => {
        fetch("http://localhost:8080/sensorlocations")
          .then((response) => response.json())
          .then((data: { locations: locationsData[] }) => {
            setSensorLocations(data.locations);
          })
          .catch((error) => console.error("Error:", error));
      }, []);

    return (
        <Box maxWidth="xs" sx={{backgroundColor: "white", width: 100, height: 100}}>
        </Box>
    );
};

export default SensorLocations;