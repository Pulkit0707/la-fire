import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const DONATION_AMOUNTS = [
  { value: 10, label: '$10' },
  { value: 25, label: '$25' },
  { value: 50, label: '$50' },
  { value: 100, label: '$100' },
  { value: 250, label: '$250' },
  { value: 500, label: '$500' }
];

export default function DonateForm() {
  const navigate = useNavigate();
  const [amount, setAmount] = React.useState('');
  const [customAmount, setCustomAmount] = React.useState('');
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

      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to load');

      // Create a checkout session
      const response = await fetch('/.netlify/functions/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: parseFloat(amount || customAmount) * 100, // Convert to cents
          userId: session.data.session.user.id,
        }),
      });

      const { sessionId } = await response.json();

      // Redirect to Stripe checkout
      const { error } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (error) throw error;
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to process donation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Make a Donation</h1>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-4">
              Select Amount
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {DONATION_AMOUNTS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    setAmount(option.value.toString());
                    setCustomAmount('');
                  }}
                  className={`py-3 px-4 border rounded-lg text-lg font-medium transition-colors
                    ${amount === option.value.toString()
                      ? 'bg-red-600 text-white border-red-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-red-600 hover:text-red-600'
                    }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-2 bg-white text-gray-500">or</span>
            </div>
          </div>

          <div>
            <label htmlFor="customAmount" className="block text-sm font-medium text-gray-700 mb-2">
              Custom Amount ($)
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                id="customAmount"
                min="1"
                step="0.01"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setAmount('');
                }}
                className="block w-full pl-7 pr-12 py-3 border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                placeholder="0.00"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || (!amount && !customAmount)}
            className="w-full bg-red-600 text-white py-3 px-4 rounded-md text-lg font-medium
              hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : `Donate ${amount || customAmount ? `$${amount || customAmount}` : ''}`}
          </button>
        </form>
      </div>
    </div>
  );
}