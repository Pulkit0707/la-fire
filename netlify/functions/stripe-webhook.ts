import { Handler } from '@netlify/functions';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const sig = event.headers['stripe-signature']!;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  try {
    const stripeEvent = stripe.webhooks.constructEvent(
      event.body!,
      sig,
      webhookSecret
    );

    if (stripeEvent.type === 'checkout.session.completed') {
      const session = stripeEvent.data.object as Stripe.Checkout.Session;
      
      // Record the donation in Supabase
      const { error } = await supabase.from('donations').insert({
        user_id: session.metadata?.userId,
        amount: session.amount_total! / 100, // Convert from cents to dollars
      });

      if (error) throw error;
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ received: true }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Webhook Error' }),
    };
  }
};