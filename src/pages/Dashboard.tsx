import React from 'react';
import { MapPin, AlertTriangle, Heart } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

export default function Dashboard() {
  const [totalDonations, setTotalDonations] = React.useState(0);
  const [fireUpdates, setFireUpdates] = React.useState([]);
  const [shelters, setShelters] = React.useState([]);

  React.useEffect(() => {
    fetchTotalDonations();
    // In a real app, you would fetch real fire updates and shelter data
    // from appropriate APIs
  }, []);

  const fetchTotalDonations = async () => {
    const { data, error } = await supabase
      .from('donations')
      .select('amount');
    
    if (!error && data) {
      const total = data.reduce((sum, donation) => sum + donation.amount, 0);
      setTotalDonations(total);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Total Donations</h2>
            <Heart className="h-6 w-6 text-red-500" />
          </div>
          <p className="text-3xl font-bold text-red-600 mt-2">${totalDonations.toLocaleString()}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Active Fires</h2>
            <AlertTriangle className="h-6 w-6 text-yellow-500" />
          </div>
          <p className="text-3xl font-bold text-yellow-600 mt-2">3 Active</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Available Shelters</h2>
            <MapPin className="h-6 w-6 text-green-500" />
          </div>
          <p className="text-3xl font-bold text-green-600 mt-2">5 Open</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Fire Updates</h2>
        <div className="h-[400px]">
          <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
            <GoogleMap
              mapContainerStyle={{ width: '100%', height: '100%' }}
              center={{ lat: 34.0522, lng: -118.2437 }}
              zoom={10}
            >
              {/* Add markers for fires and shelters */}
            </GoogleMap>
          </LoadScript>
        </div>
      </div>
    </div>
  );
}