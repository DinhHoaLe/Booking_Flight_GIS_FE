// src/components/MapView.js
import React, { useEffect, useRef } from "react";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";

function ArcgisMap() {
  const mapDiv = useRef(null);

  useEffect(() => {
    const map = new Map({
      basemap: "streets-navigation-vector"
    });

    const view = new MapView({
      container: mapDiv.current,
      map: map,
      center: [106.7, 10.7], // tọa độ HCM
      zoom: 12
    });

    return () => {
      view.destroy(); // cleanup
    };
  }, []);

  return <div style={{ height: "500px" }} ref={mapDiv}></div>;
}

export default ArcgisMap;
