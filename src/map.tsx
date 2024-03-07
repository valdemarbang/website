import React, { useState } from "react"
import { Map, Marker, Overlay, GeoJson } from "pigeon-maps"
import { BadgeMark } from "@mui/material";


export default function MyMap() {
  const color = 'red'
  const [isMarkerClicked, setIsMarkerClicked] = useState(false);


  const handleMarkerClick = (): void => {
    // Handle the marker click event here
    setIsMarkerClicked(!isMarkerClicked);

  };



  return (
    <Map height={982} width={720} defaultCenter={[50.879, 4.6997]} defaultZoom={11}>
      <Marker 
        width={50}
        anchor={[50.879, 4.6997]} 
        color={color} 
        onClick={() => handleMarkerClick()} 
        
      />

    {isMarkerClicked && (
      <Overlay anchor={[50.879, 4.85]} offset={[120, 79]}>
      <img src='/img/pigeon.jpg' width={240} height={158} alt='' />
    </Overlay>
    
    ) && (<GeoJson
      data={geoJsonSample}
      styleCallback={(feature, hover) => {
        if (feature.geometry.type === "LineString") {
          return { strokeWidth: "1", stroke: "black" };
        }
        return {
          fill: "#d4e6ec99",
          strokeWidth: "1",
          stroke: "white",
          r: "20",
        };
      }}
    />) }
    </Map>
  )
}


const geoJsonSample = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [2.0, 48.5] },
      properties: { prop0: "value0" },
    },
  ],
};


export function MyMapFail() {

  const [overlays, setOverlays] = useState([]);

  const markerClick = event => {
    setOverlays(overlays.concat());
  
  };

  return (
    <Map height={800} width={800} defaultCenter={[50.879, 4.6997]} defaultZoom={11}>
      <Marker 
        width={50}
        anchor={[50.879, 4.6997]} 
        color={'red'} 
        onClick={markerClick} 
      />
      {overlays}
      
    </Map>
  )
};