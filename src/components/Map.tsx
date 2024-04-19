import { useEffect, useState } from "react";
import { Map, ZoomControl, Marker, Overlay, Point } from "pigeon-maps";
import { Cluster } from "pigeon-maps-cluster";
import MarkerOverlay from "./MarkerOverlay.tsx";

/**
 * Interface for coordinate data
 */
interface coordinateData {
  ID: number;
  latitude: number;
  longitude: number;
}

/**
 * MapComponent displays the map with markers and overlay
 * @returns Map component with markers and overlay
 */
function MapComponent() {
  // Start position for the map
  const linkoping: [number, number] = [58.4, 15.625278];

  /**
   * Get selected markers data and coordinates when a marker is clicked
   * @param markerData - Unique id for the selected marker
   * @param coordinates - Latitude and longitude for the selected marker
   * @returns Selected marker data and coordinates
   */
  const [selectedMarkerData, setSelectedMarkerData] = useState(null);
  const [selectedMarkerCoordinates, setSelectedMarkerCoordinates] = useState<Point | undefined>(undefined);

  const handleMarkerClick = async (markerData: coordinateData) => {
    const response = await fetch(`http://localhost:8080/map/${markerData.ID}`);
    const data = await response.json();
    setSelectedMarkerData(data);
    setSelectedMarkerCoordinates([markerData.latitude, markerData.longitude]);
  };

  /**
   * Load map markers data from the server when the component is mounted
   */
  const [mapMarkersData, setMapMarkersData] = useState<coordinateData[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/map")
      .then((response) => response.json())
      .then((data: { markers: coordinateData[] }) => {
        setMapMarkersData(data.markers);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <Map
      defaultCenter={linkoping}
      defaultZoom={3}
      onClick={() => setSelectedMarkerData(null)} // Remove marker overlay when map is clicked
    >
      <Cluster>
        {mapMarkersData.map((marker: coordinateData) => (
          <Marker
            onClick={() =>
              handleMarkerClick(marker)
            }
            key={marker.ID} // Unique id for each marker
            anchor={[marker.latitude, marker.longitude]} // Latitude and longitude
            color="#1F3559"
          ></Marker>
        ))}
      </Cluster>
      <ZoomControl />
      {selectedMarkerData && (
        <Overlay
          anchor={selectedMarkerCoordinates}
          offset={[50, 50]}
          style={{ zIndex: 1 }} // Render overlay on top of markers/clusters
        >
          <MarkerOverlay // Create MarkerOverlay component
            markerData={selectedMarkerData} // Unique id for selected marker
            closeOverlay={() => setSelectedMarkerData(null)} // Set selected marker to null when overlay is closed
          />
        </Overlay>
      )}
    </Map>
  );
}

export default MapComponent;
