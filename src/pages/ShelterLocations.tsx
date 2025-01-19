import React from 'react';
import { MapPin, Users, Phone } from 'lucide-react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

interface Shelter {
  id: number;
  name: string;
  location: { lat: number; lng: number };
  address: string;
  capacity: number;
  occupancy: number;
  contact: string;
}

const MOCK_SHELTERS: Shelter[] = [
  {
    id: 1,
    name: "Griffith Park Recreation Center",
    location: { lat: 34.1381, lng: -118.2869 },
    address: "3401 Riverside Dr, Los Angeles, CA 90027",
    capacity: 200,
    occupancy: 85,
    contact: "(323) 555-0123"
  },
  {
    id: 2,
    name: "Van Nuys Recreation Center",
    location: { lat: 34.1899, lng: -118.4489 },
    address: "14301 Vanowen St, Van Nuys, CA 91405",
    capacity: 150,
    occupancy: 60,
    contact: "(818) 555-0124"
  },
  {
    id: 3,
    name: "Woodland Hills Recreation Center",
    location: { lat: 34.1684, lng: -118.6055 },
    address: "5858 Shoup Ave, Woodland Hills, CA 91367",
    capacity: 180,
    occupancy: 95,
    contact: "(818) 555-0125"
  },
  {
    id: 4,
    name: "Pasadena Community Center",
    location: { lat: 34.1478, lng: -118.1445 },
    address: "85 E Holly St, Pasadena, CA 91103",
    capacity: 250,
    occupancy: 120,
    contact: "(626) 555-0126"
  },
  {
    id: 5,
    name: "Glendale Civic Auditorium",
    location: { lat: 34.1425, lng: -118.2551 },
    address: "1401 N Verdugo Rd, Glendale, CA 91208",
    capacity: 300,
    occupancy: 175,
    contact: "(818) 555-0127"
  }
];

export default function ShelterLocations() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center space-x-2 mb-6">
        <MapPin className="h-8 w-8 text-green-500" />
        <h1 className="text-3xl font-bold">Available Shelters</h1>
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
                {MOCK_SHELTERS.map((shelter) => (
                  <Marker
                    key={shelter.id}
                    position={shelter.location}
                    title={shelter.name}
                  />
                ))}
              </GoogleMap>
            </LoadScript>
          </div>
        </div>

        <div className="space-y-4">
          {MOCK_SHELTERS.map((shelter) => (
            <div key={shelter.id} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">{shelter.name}</h2>
              <p className="text-gray-600 mb-4">{shelter.address}</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Capacity</p>
                    <p className="font-medium">{shelter.occupancy} / {shelter.capacity}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Contact</p>
                    <p className="font-medium">{shelter.contact}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}