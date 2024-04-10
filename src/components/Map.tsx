import React, { useState } from "react";
import { Map, ZoomControl, Marker } from "pigeon-maps";
import { Cluster } from "pigeon-maps-cluster";

const handleMapChange = () => {
  console.log("Map changed");
};

const coordinates = [
  [50,30],
  [20,80],
  [10,90]
]

function MapComponent() {
  const linkoping: [number, number] = [58.4, 15.625278];

  return (
    <Map
      defaultCenter={linkoping}
      defaultZoom={3}
      onBoundsChanged={handleMapChange}
    >
      <ZoomControl />
      <Cluster>
        {
            coordinates.map(coordinate => <Marker key={coordinate.toString()} anchor={coordinate} />)
        }
    </Cluster>
    </Map>
  );
}

export default MapComponent;
