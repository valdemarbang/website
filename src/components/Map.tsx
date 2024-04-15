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
  
  // State for markers so they can be displayed on the map
  const [markersData, setMarkersData] = useState<[number, number, number][]>(
    []
  );
  
  /**
   * Fetches coordinates from the backend
   * @returns Array of coordinates
   */
  const fetchCoordinates = async () => {
    const response = await fetch("http://localhost:8080/map");
    const data = await response.json();
    return data;
  };
  
  // State for selected marker so the overlay can be updated
  // Selected marker is an array with id, latitude and longitude
  const [selectedMarker, setSelectedMarker] = useState<
    [number, number, number] | null
  >(null);

  // Function to handle marker click and set selected marker
  const handleMarkerClick = (marker: [number, number, number]) => {
    setSelectedMarker(marker);
  };

  // Fetch coordinates only once on component mount
  useEffect(() => {
    fetchCoordinates().then((data) => {
      const markersData: [number, number, number][] = data.markers.map(
        (marker: { id: number; lat: number; lng: number }) => [
          marker.id,
          marker.lat,
          marker.lng,
        ]
      );
      setMarkersData(markersData);
    });
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <Map
      defaultCenter={linkoping}
      defaultZoom={3}
      onClick={() => setSelectedMarker(null)}
    >
      <Cluster>
        {markersData.map((marker: [number, number, number]) => (
          <Marker
          onClick={() => handleMarkerClick(marker)}
          key={marker[0]} // Unique id for each marker
          anchor={[marker[1], marker[2]]} // Latitude and longitude
          color="#1F3559"
          >
          </Marker>
        ))}
      </Cluster>
      <ZoomControl />
      {selectedMarker && (
        <Overlay
          anchor={[selectedMarker[1], selectedMarker[2]]}
          offset={[120, 79]}
          style={{ zIndex: 1 }} // Render overlay on top of markers/clusters
        >
          <MarkerOverlay
            markerID={selectedMarker[0]} // Unique id for selected marker
            closeOverlay={() => setSelectedMarker(null)} // Set selected marker to null when overlay is closed
          />
        </Overlay>
      )}
    </Map>
  );
}

export default MapComponent;
