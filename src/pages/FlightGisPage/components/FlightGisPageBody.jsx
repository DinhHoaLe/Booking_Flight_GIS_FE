import React, { useEffect, useState, useRef } from "react";
import "@arcgis/core/assets/esri/themes/light/main.css";
import Map from "@arcgis/core/Map";
import SceneView from "@arcgis/core/views/SceneView";
import Graphic from "@arcgis/core/Graphic";
import Point from "@arcgis/core/geometry/Point";
import Polyline from "@arcgis/core/geometry/Polyline";
import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";
import { Select } from "antd";
import dataGis from "./dataGis.json";

function FlightGisPageBody() {
  const [location, setLocation] = useState(null);
  const mapDiv = useRef(null);
  const viewRef = useRef(null);

  useEffect(() => {
    const map = new Map({
      basemap: "streets-navigation-vector",
      ground: "world-elevation",
    });

    const view = new SceneView({
      container: mapDiv.current,
      map: map,
      camera: {
        position: {
          longitude: 108.20246209559326,
          latitude: 16.057176295087878,
          z: 250,
        },
        tilt: 65,
      },
    });

    viewRef.current = view;

    view.when(() => {
      const hotelGraphics = dataGis.flatMap((airport) =>
        airport.hotels.flatMap((hotel) => {
          const point = new Point({ longitude: hotel.lon, latitude: hotel.lat });

          const backgroundSymbol = new SimpleMarkerSymbol({
            style: "square",
            color: [255, 255, 255, 0.5],
            size: 36,
            outline: { color: [0, 0, 0, 0.3], width: 1.5 },
          });

          const backgroundGraphic = new Graphic({
            geometry: point,
            symbol: backgroundSymbol,
            attributes: { type: "hotelBackground" },
          });

          const symbol = new PictureMarkerSymbol({
            url: hotel.image || "/imgs/hotel.png",
            width: "28px",
            height: "28px",
          });

          const hotelGraphic = new Graphic({
            geometry: point,
            symbol,
            attributes: {
              Name: hotel.name,
              Info: hotel.info,
              Airport: airport.airport,
              type: "hotelIcon",
            },
            popupTemplate: {
              title: "{Name} (gần {Airport})",
              content: [
                {
                  type: "media",
                  mediaInfos: [
                    {
                      type: "image",
                      value: {
                        sourceURL: hotel.image || "/imgs/hotel.png",
                        linkURL: hotel.image || "/imgs/hotel.png",
                      },
                      title: "Hình ảnh khách sạn",
                    },
                  ],
                },
                {
                  type: "text",
                  text: "{Info}",
                },
              ],
            },
          });

          return [backgroundGraphic, hotelGraphic];
        })
      );

      view.graphics.addMany(hotelGraphics);
    });

    return () => {
      if (viewRef.current) viewRef.current.destroy();
    };
  }, []);

  useEffect(() => {
    if (!location || !viewRef.current) return;

    const matched = dataGis.find((item) => item.airport === location);
    if (!matched) return;

    const view = viewRef.current;

    view.goTo({
      center: [matched.lon, matched.lat],
      zoom: 15,
    });

    view.graphics.removeMany(
      view.graphics.items.filter((g) =>
        g.attributes?.type === "selectedAirport" || g.attributes?.type === "routeLine"
      )
    );

    const airportPoint = new Point({
      longitude: matched.lon,
      latitude: matched.lat,
    });

    const airportSymbol = new PictureMarkerSymbol({
      url: matched.image || "/imgs/location.png",
      width: "32px",
      height: "32px",
    });

    const airportGraphic = new Graphic({
      geometry: airportPoint,
      symbol: airportSymbol,
      attributes: {
        type: "selectedAirport",
        Name: matched.airport,
        Info: "Vị trí sân bay được chọn",
      },
      popupTemplate: {
        title: "{Name}",
        content: [
          {
            type: "media",
            mediaInfos: [
              {
                type: "image",
                value: {
                  sourceURL: matched.image || "/imgs/location.png",
                  linkURL: matched.image || "/imgs/location.png",
                },
                title: "Hình ảnh sân bay",
              },
            ],
          },
          {
            type: "text",
            text: "{Info}",
          },
        ],
      },
    });

    view.graphics.add(airportGraphic);

    const colorPalette = [
      [255, 0, 0, 0.6],
      [0, 128, 255, 0.6],
      [255, 165, 0, 0.6],
      [34, 139, 34, 0.6],
      [148, 0, 211, 0.6],
      [0, 0, 0, 0.4],
    ];

    const lineGraphics = matched.hotels.map((hotel, index) => {
      const polyline = new Polyline({
        paths: [
          [matched.lon, matched.lat],
          [hotel.lon, hotel.lat],
        ],
        spatialReference: { wkid: 4326 },
      });

      const color = colorPalette[index % colorPalette.length];

      const lineSymbol = new SimpleLineSymbol({
        color: color,
        width: 2.5,
        style: "solid",
      });

      return new Graphic({
        geometry: polyline,
        symbol: lineSymbol,
        attributes: {
          type: "routeLine",
          from: matched.airport,
          to: hotel.name,
        },
      });
    });

    view.graphics.addMany(lineGraphics);
  }, [location]);

  return (
    <div>
      <Select
        style={{ width: "100%" }}
        placeholder="Chọn sân bay"
        onChange={(value) => setLocation(value)}
        options={dataGis.map((item) => ({
          label: item.airport,
          value: item.airport,
        }))}
      />
      <div
        style={{
          height: "500px",
          width: "100%",
          marginTop: "50px",
          marginBottom: "50px",
        }}
        ref={mapDiv}
      ></div>
    </div>
  );
}

export default FlightGisPageBody;
