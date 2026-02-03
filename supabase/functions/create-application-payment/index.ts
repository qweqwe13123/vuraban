import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, selectedPlan, applicationData } = await req.json();

    if (!email) {
      return new Response(JSON.stringify({ error: "Email is required" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    // Get Stripe secret key from environment
    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeSecretKey) {
      console.error("STRIPE_SECRET_KEY is not set in environment variables");
      return new Response(JSON.stringify({ error: "Stripe configuration error. Please contact support." }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    // Initialize Stripe
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2025-08-27.basil",
    });

    // Check if a Stripe customer record exists for this email
    const customers = await stripe.customers.list({ email: email, limit: 1 });
    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
    }

    // Use existing Price ID from Stripe Dashboard (test mode)
    // Price ID: price_1SwJMn2IXZKdktMgv9yX3rCw for $5.00 one-time payment
    const PRICE_ID = Deno.env.get("STRIPE_PRICE_ID") || "price_1SwJMn2IXZKdktMgv9yX3rCw";

    // Get origin from request headers or use a fallback
    const origin = req.headers.get("origin") || req.headers.get("referer")?.split("/").slice(0, 3).join("/") || "http://localhost:5173";
    
    console.log("Creating checkout session with:", {
      email,
      priceId: PRICE_ID,
      origin,
      hasCustomer: !!customerId,
    });

    // Create a one-time payment session
    const session = await stripe.checkout.sessions.create({
      customer: customerId || undefined,
      customer_email: customerId ? undefined : email,
      line_items: [
        {
          price: PRICE_ID,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/apply`,
      metadata: {
        selectedPlan: selectedPlan ? JSON.stringify(selectedPlan) : "",
        applicantEmail: email,
      },
    });

    console.log("Checkout session created:", session.id);

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error: unknown) {
    let errorMessage = "Unknown error occurred";
    let errorDetails = null;

    if (error instanceof Error) {
      errorMessage = error.message;
      errorDetails = error.stack;
    } else if (typeof error === "object" && error !== null) {
      errorMessage = JSON.stringify(error);
    }

    console.error("Error creating payment session:", {
      message: errorMessage,
      details: errorDetails,
      error: error,
    });

    // Return user-friendly error message
    return new Response(JSON.stringify({ 
      error: errorMessage,
      details: process.env.NODE_ENV === "development" ? errorDetails : undefined,
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
