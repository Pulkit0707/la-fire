import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function DonateForm() {
  const navigate = useNavigate();
  const [amount, setAmount] = React.useState('');
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

      // Here you would typically integrate with Stripe
      // For now, we'll just save the donation
      const { error } = await supabase
        .from('donations')
        .insert([
          {
            amount: parseFloat(amount),
            user_id: session.data.session.user.id
          }
        ]);

      if (error) throw error;

      navigate('/donations');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Make a Donation</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
            Donation Amount ($)
          </label>
          <input
            type="number"
            id="amount"
            min="1"
            step="0.01"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'Donate Now'}
        </button>
      </form>
    </div>
  );
}