import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function ResourceRequest() {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    resourceType: '',
    address: ''
  });
  const [loading, setLoading] = React.useState(false);

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
            user_id: session.data.session.user.id
          }
        ]);

      if (error) throw error;

      navigate('/');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Request Resources</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="resourceType" className="block text-sm font-medium text-gray-700 mb-2">
            What do you need?
          </label>
          <select
            id="resourceType"
            required
            value={formData.resourceType}
            onChange={(e) => setFormData(prev => ({ ...prev, resourceType: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="">Select a resource type</option>
            <option value="water">Water</option>
            <option value="food">Food</option>
            <option value="shelter">Shelter</option>
            <option value="medical">Medical Supplies</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="mb-6">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
            Delivery Address
          </label>
          <textarea
            id="address"
            required
            value={formData.address}
            onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            rows={3}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {loading ? 'Submitting...' : 'Submit Request'}
        </button>
      </form>
    </div>
  );
}