import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

interface Fire {
  id: number;
  name: string;
  location: { lat: number; lng: number };
  status: string;
  containment: number;
  startDate: string;
  area: string;
}

const MOCK_FIRES: Fire[] = [
  {
    id: 1,
    name: "Angeles Forest Fire",
    location: { lat: 34.2283, lng: -118.1798 },
    status: "Active",
    containment: 35,
    startDate: "2025-01-15",
    area: "2,500 acres"
  },
  {
    id: 2,
    name: "Santa Monica Mountains Fire",
    location: { lat: 34.0898, lng: -118.7035 },
    status: "Active",
    containment: 20,
    startDate: "2025-01-14",
    area: "1,800 acres"
  },
  {
    id: 3,
    name: "Verdugo Hills Fire",
    location: { lat: 34.2066, lng: -118.2373 },
    status: "Active",
    containment: 45,
    startDate: "2025-01-13",
    area: "900 acres"
  }
];

export default function FireLocations() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center space-x-2 mb-6">
        <AlertTriangle className="h-8 w-8 text-yellow-500" />
        <h1 className="text-3xl font-bold">Active Fire Locations</h1>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="h-[600px]">
            <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
              <GoogleMap
                mapContainerStyle={{ width: '100%', height: '100%' }}
                center={{ lat: 34.0522, lng: -118.2437 }}
                zoom={10}
              >
                {MOCK_FIRES.map((fire) => (
                  <Marker
                    key={fire.id}
                    position={fire.location}
                    title={fire.name}
                  />
                ))}
              </GoogleMap>
            </LoadScript>
          </div>
        </div>

        <div className="space-y-4">
          {MOCK_FIRES.map((fire) => (
            <div key={fire.id} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">{fire.name}</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <p className="font-medium text-yellow-600">{fire.status}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Containment</p>
                  <p className="font-medium">{fire.containment}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Start Date</p>
                  <p className="font-medium">{fire.startDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Affected Area</p>
                  <p className="font-medium">{fire.area}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}