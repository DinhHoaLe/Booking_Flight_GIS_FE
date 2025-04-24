import React, { useEffect, useRef } from "react";
import "@arcgis/core/assets/esri/themes/light/main.css";
import Map from "@arcgis/core/Map";
import SceneView from "@arcgis/core/views/SceneView";
import Graphic from "@arcgis/core/Graphic";
import Point from "@arcgis/core/geometry/Point";
import Polyline from "@arcgis/core/geometry/Polyline";
import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";
import dataGis from "./dataGis.json";
import { useSelector } from "react-redux";

function FlightSearchPageGis() {
  const mapDiv = useRef(null);
  const viewRef = useRef(null);
  const { searchData } = useSelector((state) => state?.searchSlice);

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
          const point = new Point({
            longitude: hotel.lon,
            latitude: hotel.lat,
          });

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
    if (!searchData?.departureAirport || !searchData?.destinationAirport || !viewRef.current) return;

    const view = viewRef.current;

    const departureAirport = dataGis.find((item) => item.airport === searchData?.departureAirport);
    const destinationAirport = dataGis.find((item) => item.airport === searchData?.destinationAirport);

    if (!departureAirport || !destinationAirport) return;

    view.goTo({
      center: [departureAirport.lon, departureAirport.lat],
      zoom: 7,
    });

    view.graphics.removeMany(
      view.graphics.items.filter(
        (g) =>
          g.attributes?.type === "selectedAirport" ||
          g.attributes?.type === "routeLine"
      )
    );

    const drawAirportMarker = (airport, type) => {
      const point = new Point({
        longitude: airport.lon,
        latitude: airport.lat,
      });

      const symbol = new PictureMarkerSymbol({
        url: airport.image || "/imgs/location.png",
        width: "32px",
        height: "32px",
      });

      const graphic = new Graphic({
        geometry: point,
        symbol: symbol,
        attributes: {
          type: "selectedAirport",
          Name: airport.airport,
          Info: type === "departure" ? "Sân bay khởi hành" : "Sân bay đến",
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
                    sourceURL: airport.image || "/imgs/location.png",
                    linkURL: airport.image || "/imgs/location.png",
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

      view.graphics.add(graphic);
    };

    drawAirportMarker(departureAirport, "departure");
    drawAirportMarker(destinationAirport, "destination");

    // Draw route line between them
    const polyline = new Polyline({
      paths: [
        [departureAirport.lon, departureAirport.lat],
        [destinationAirport.lon, destinationAirport.lat],
      ],
      spatialReference: { wkid: 4326 },
    });

    const lineSymbol = new SimpleLineSymbol({
      color: [255, 0, 0, 0.6],
      width: 3,
      style: "solid",
    });

    const lineGraphic = new Graphic({
      geometry: polyline,
      symbol: lineSymbol,
      attributes: {
        type: "routeLine",
        from: departureAirport.airport,
        to: destinationAirport.airport,
      },
    });

    view.graphics.add(lineGraphic);
  }, [searchData?.departureAirport, searchData?.destinationAirport]);

  return (
    <div>
      <div
        style={{
          height: "500px",
          width: "100%",
        }}
        ref={mapDiv}
      ></div>
    </div>
  );
}

export default FlightSearchPageGis;
