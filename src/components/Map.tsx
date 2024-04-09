import { useState, useEffect } from "react"
import { Map, Marker } from "pigeon-maps"
import MyMarker from "./Markers";

function getWindowSize(): [number, number] {
  const {innerWidth, innerHeight} = window;
  return [innerWidth, innerHeight];
}

export default function MyMap() {
  const [hue, setHue] = useState(0)
  const color = `hsl(${hue % 360}deg 39% 70%)`

  const linkoping: [number, number] = [58.4, 15.625278];

  const [windowSize, setWindowSize] = useState(getWindowSize());

  const handleWindowResize = () => {
      setWindowSize(getWindowSize());
  } 

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);
    return () => { window.removeEventListener('resize', handleWindowResize) };
  }, []);

  return (
    <Map width={windowSize[0]} height={windowSize[1]-65}

    defaultCenter={linkoping} defaultZoom={11}>
      
      <MyMarker />

      <Marker 
        width={50}
        anchor={[58.45, 15.6]}
        color={color} 

        onClick={() => setHue(hue + 20)} 
      />
    </Map>
    
  )
}
