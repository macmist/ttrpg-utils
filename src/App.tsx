import React from 'react';
import MapRenderer from "./map/MapRenderer";

function App() {
  return <MapRenderer width={500} height={500} points={[{x: 250, y: 250, color: '#fff'}]}/>;
}

export default App;
