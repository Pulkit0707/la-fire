import React from 'react';
import { MapPin, AlertTriangle, Heart } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useNavigate } from 'react-router-dom';

interface ResourceRequest {
  resourceType: string;
  address: string;
  description: string;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [totalDonations, setTotalDonations] = React.useState(0);
  const [fireUpdates, setFireUpdates] = React.useState([]);
  const [shelters, setShelters] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [formData, setFormData] = React.useState<ResourceRequest>({
    resourceType: '',
    address: '',
    description: ''
  });

  React.useEffect(() => {
    fetchTotalDonations();
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const session = await supabase.auth.getSession();
      if (!session.data.session?.user) {
        navigate('/signin');
        return;
      }

      const { error } = await supabase
        .from('resource_requests')
        .insert([
          {
            resource_type: formData.resourceType,
            address: formData.address,
            description: formData.description,
            user_id: session.data.session.user.id
          }
        ]);

      if (error) throw error;

      // Reset form
      setFormData({
        resourceType: '',
        address: '',
        description: ''
      });

      alert('Resource request submitted successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit request. Please try again.');
    } finally {
      setLoading(false);
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

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-6">Request Resources</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="resourceType" className="block text-sm font-medium text-gray-700 mb-1">
                What do you need?
              </label>
              <select
                id="resourceType"
                required
                value={formData.resourceType}
                onChange={(e) => setFormData(prev => ({ ...prev, resourceType: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
              >
                <option value="">Select a resource type</option>
                <option value="water">Water</option>
                <option value="food">Food</option>
                <option value="shelter">Shelter</option>
                <option value="medical">Medical Supplies</option>
                <option value="evacuation">Evacuation Assistance</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Delivery Address
              </label>
              <input
                type="text"
                id="address"
                required
                value={formData.address}
                onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                placeholder="Enter your address"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Additional Details
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                rows={3}
                placeholder="Describe your needs in detail"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 
                focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 
                disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Submitting...' : 'Submit Request'}
            </button>
          </form>
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
    </div>
  );
}