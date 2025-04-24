import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function MyMap() {
  return (
    <MapContainer
      center={[10.7773549, 106.6356536]}
      zoom={13}
      style={{ height: "200px", width: "300px" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[10.7773549, 106.6356536]}>
        <Popup>My Marker</Popup>
      </Marker>
    </MapContainer>
  );
}

export default MyMap;
