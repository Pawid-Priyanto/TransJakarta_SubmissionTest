import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import type { Vehicle } from "../types/vehicle";

interface VehicleMapProps {
  vehicle: Vehicle;
}

const vehicleIcon = L.divIcon({
  className: "",
  html: `
    <div style="
      width: 32px;
      height: 32px;
      background: #2563eb;
      border: 3px solid white;
      border-radius: 50%;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    "></div>
  `,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

const VehicleMap = ({ vehicle }: VehicleMapProps) => {
  const { latitude, longitude, label } =
    vehicle.attributes;

  return (
    <div className="h-80 overflow-hidden rounded-xl">
      <MapContainer
        center={[latitude, longitude]}
        zoom={15}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker
          position={[latitude, longitude]}
          icon={vehicleIcon}
        >
          <Popup>
            <strong>Vehicle {label}</strong>
            <br />
            {latitude}, {longitude}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default VehicleMap;