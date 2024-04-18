import { useEffect, useState } from "react";
import { Map, ZoomControl, Marker, Overlay } from "pigeon-maps";
import { Cluster } from "pigeon-maps-cluster";
import MarkerOverlay from "./MarkerOverlay.tsx";

/**
 * MapComponent displays the map with markers and overlay
 * @returns Map component with markers and overlay
 */
function MapComponent() {
  // Start position for the map
  const linkoping: [number, number] = [58.4, 15.625278];

  /**
   * State for selected marker data and handle marker click
   */
  const [selectedMarkerData, setSelectedMarkerData] = useState(null);
  const [selectedMarkerCoordinates, setSelectedMarkerCoordinates] = useState<[number, number] | undefined>();
  
  const handleMarkerClick = async (markerID: number, coordinates: [number, number]) => {
    const response = await fetch(`http://localhost:8080/map/${markerID}`);
    const data = await response.json();
    setSelectedMarkerData(data);
    setSelectedMarkerCoordinates(coordinates);
  };

  /**
   * Fetches coordinates from the backend when the website loads
   * @returns Array of coordinates
   */
  const fetchCoordinates = async () => {
    const response = await fetch("http://localhost:8080/map");
    const data = await response.json();
    return data;
  };

  const [mapMarkersData, setMapMarkersData] = useState<
    [number, number, number][]
  >([]);

  useEffect(() => {
    fetchCoordinates().then((data) => {
      const mapMarkersData: [number, number, number][] = data.markers.map(
        (marker: { id: number; lat: number; lng: number }) => [
          marker.id,
          marker.lat,
          marker.lng,
        ]
      );
      setMapMarkersData(mapMarkersData);
    });
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <Map
      defaultCenter={linkoping}
      defaultZoom={3}
      minZoom={2}
      onClick={() => setSelectedMarkerData(null)}
      limitBounds="edge"
    >
      <Cluster>
        {mapMarkersData.map((marker: [number, number, number]) => (
          <Marker
          onClick={() => handleMarkerClick(marker[0], [marker[1], marker[2]])}
            key={marker[0]} // Unique id for each marker
            anchor={[marker[1], marker[2]]} // Latitude and longitude
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
