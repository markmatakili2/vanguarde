# Stripe Payment Integration Guide

## Overview
Stripe payment integration has been added to the Philanthropy page's "Support Our Cause" section.

## Features Implemented

### 1. Beautiful Circular Page Loader
- All pages now display a beautiful circular animated loader with:
  - Three rotating rings at different speeds
  - Floating logo in the center
  - Smooth fade-in/out text animations
  - Gradient background (dark blue to green)
  - Professional appearance

### 2. Stripe Payment Integration
- Added Stripe as a payment option alongside Mastercard, PayPal, and M-Pesa
- Secure card payment processing via Stripe Elements
- Payment form includes:
  - Donation amount input
  - Email address field
  - Full name field
  - Stripe Card Element for secure card input

### 3. Backend Edge Function
- Deployed `create-payment-intent` edge function to Supabase
- Function creates Stripe payment intents securely server-side
- Handles CORS headers for browser requests
- Returns `clientSecret` for client-side confirmation

## Setup Instructions

### 1. Get Stripe API Keys
1. Create a Stripe account at https://stripe.com
2. Go to Dashboard > Developers > API keys
3. Copy your Publishable Key and Secret Key

### 2. Configure Stripe Keys

**Frontend (JavaScript):**
Update the Stripe publishable key in `script.js` (line 247):
```javascript
const stripePublishableKey = 'pk_live_YOUR_PUBLISHABLE_KEY';
```

**Backend (Edge Function):**
The `STRIPE_SECRET_KEY` environment variable is automatically managed by Supabase. Add it via:
1. Go to Supabase Dashboard > Project > Settings > Edge Functions
2. Add environment variable: `STRIPE_SECRET_KEY=sk_live_YOUR_SECRET_KEY`

### 3. Payment Flow

1. User clicks "Donate Now" button on philanthropy page
2. Payment modal appears with payment method options
3. User selects "Stripe" option
4. Fills in donation amount, email, and name
5. Enters card details in Stripe Card Element
6. Clicks "Donate via Stripe"
7. Frontend calls edge function to create payment intent
8. Stripe confirms payment with card
9. Success message displays with transaction ID

## Files Modified

- `phillanthropy.html` - Added Stripe payment option and form
- `script.js` - Added Stripe payment handler
- `styles.css` - Added Stripe card element styling
- `styles.css` - Updated loader styles for beautiful circular animation

## Files Created

- `images/stripe-logo.svg` - Stripe logo for payment options
- `supabase/functions/create-payment-intent/index.ts` - Edge function for payment intent creation

## Security Features

- PCI compliance via Stripe Elements (no raw card data handled by server)
- CORS protection on edge function
- Server-side payment intent creation
- Email receipts automatically sent by Stripe
- Transaction metadata logged for audit trail

## Testing

To test the integration:

1. Use Stripe test mode with test card numbers:
   - Success: `4242 4242 4242 4242`
   - Declined: `4000 0000 0000 0002`

2. Fill in any future expiry date (e.g., 12/25)
3. Enter any 3-digit CVC
4. Enter any email address for receipts

## Troubleshooting

**Error: "Stripe configuration missing"**
- Ensure STRIPE_SECRET_KEY environment variable is set in Supabase

**Error: "Payment intent creation failed"**
- Check that your Stripe API keys are correct
- Verify your Stripe account has payment methods enabled

**Card element not appearing**
- Ensure Stripe.js library is loaded from CDN
- Check browser console for any JavaScript errors

## Customer Experience

Users will see:
- Attractive circular loader on page load
- Professional payment option selection
- Secure Stripe card input with real-time validation
- Clear success/error feedback
- Automatic email receipt from Stripe
