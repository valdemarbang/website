import { useState, useRef } from "react"
import { Map, Marker } from "pigeon-maps"

export default function MyMap() {
  const [hue, setHue] = useState(0)
  const color = `hsl(${hue % 360}deg 39% 70%)`

  const height = useRef(window.innerHeight);
  const width = useRef(window.innerWidth);

  const linkoping: [number, number] = [58.4, 15.625278];

  return (
    <Map height={height.current} width={width.current}

    defaultCenter={linkoping} defaultZoom={11}>
      <Marker 
        width={50}
        anchor={[58.5, 15.65]}
        color={color} 
        onClick={() => setHue(hue + 20)} 
      />
      <Marker 
        width={50}
        anchor={[58.45, 15.6]}
        color={color} 
        onClick={() => setHue(hue + 20)} 
      >

      </Marker>
    </Map>
  )
}