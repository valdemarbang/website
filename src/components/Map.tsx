import { useState, useRef } from "react"
import { Map, Marker } from "pigeon-maps"

export default function MyMap() {
  const [hue, setHue] = useState(0)
  const color = `hsl(${hue % 360}deg 39% 70%)`

  const height = useRef(window.innerHeight);
  const width = useRef(window.innerWidth);

  return (
    <Map height={height.current} width={width.current}

    defaultCenter={[50.879, 4.6997]} defaultZoom={11}>
      <Marker 
        width={50}
        anchor={[50.879, 4.6997]} 
        color={color} 
        onClick={() => setHue(hue + 20)} 
      />
      <Marker 
        width={50}
        anchor={[50.879, 4.6997]} 
        color={color} 
        onClick={() => setHue(hue + 20)} 
      >

      </Marker>
    </Map>
  )
}