import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { buffer } from 'micro';

export const config = { api: { bodyParser: false } };

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2025-09-30.clover' });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }
  const sig = (req.headers['stripe-signature'] as string) || '';
  const buf = await buffer(req);
  try {
    const event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET!);
    console.log('stripe:event', event.type);
    // TODO: handle event types later
  } catch (err: any) {
    console.error('stripe:verify_fail', err?.message);
  }
  res.status(200).json({ received: true });
}
